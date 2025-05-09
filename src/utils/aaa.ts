
type ConcurrencyConfig = {
  /** 最大并发数量 */
  maxRequestSize?: number;
  /** 轮询时间间隔 */
  pollingInterval?: number;
};

/**
 * 并发多个异步任务，默认一次并发数量为 5,默认轮询时间间隔为 200ms
 * @param taskQueue 异步任务数组
 * @param config 并发配置
 * @param config.maxRequestSize 最大并发数量
 * @param config.pollingInterval 轮询时间间隔
 * @returns Promise
 */
export const concurrentRequest = <T>(
  taskQueue: (() => Promise<T>)[],
  config: ConcurrencyConfig = {
    maxRequestSize: 5,
    pollingInterval: 200
  }
) => {
  const { maxRequestSize, pollingInterval } = config;
  let pool = maxRequestSize;
  const total = taskQueue.length;
  const results: { [key: string]: T } = {};
  return new Promise((resolve, reject) => {
    if (total === 0) {
      resolve(results);
      return;
    }
    // 每 200毫秒轮询一次，判断 pool 是否满了，如果满了则等待
    const interval = setInterval(() => {
      // 如果结果对象的 key 数量等于任务数量，则说明全部执行完毕
      if (Object.keys(results).length === total) {
        clearInterval(interval);
        resolve(results);
        return;
      }
      // 当有空闲槽位，且任务队列不为空时，取出空闲槽位数量的任务，执行
      while (pool > 0 && taskQueue.length > 0) {
        // 执行任务
        const task = taskQueue.shift();
        const currentIndex = total - taskQueue.length;
        pool -= 1;
        task()
          .then((res) => {
            // 任务执行完毕，释放一个并发槽位
            pool += 1;
            // 任务执行成功，将结果放入结果对象
            results[currentIndex] = res;
          })
          .catch((error) => {
            // 出现异常，则停止轮询，并抛出异常
            clearInterval(interval);
            reject(`任务执行失败，异常信息：${JSON.stringify(error)}`);
          });
      }
    }, pollingInterval);
  });
};

type Config<T> = {
  /** 接口参数 */
  params: T;
  /**  data 字段名 ,默认 records*/
  dataName?: string;
  /**
   *  生成参数函数
   * @param current 当前页码
   * @param params 请求参数
   * @returns 生成的参数
   */
  generateParams: (current: number, params: T) => T;
  /** 最大请求数量 */
  maxRequestSize: number;
  /** 轮询间隔 */
  pollingInterval?: number;
  /** 轮询成功回调 */
  pollingSuccessCallback?: (data: any) => void;
  /** 轮询失败回调 */
  pollingFailCallback?: (error: any) => void;
};

/**
 * 获取表格数据，如果数据总数超出最大请求，则将大请求分成多个 chunk ,并发请求，并合并数据
 * @param  service  (required) 请求接口
 * @param  config (required) 配置信息
 * @param  config.params (required) 请求参数
 * @param  config.dataName data 字段名,默认 records
 * @param  config.generateParams  (required) 生成参数函数
 * @param  config.maxRequestSize  (required) 最大请求数量
 * @param  config.pollingInterval 轮询间隔
 * @param  config.pollingSuccessCallback 轮询成功回调
 * @param  config.pollingFailCallback 轮询失败回调
 * @returns 表格数据
 * */
export const chunkAndMergeRequests = async <T, R>(
  service: (params: T) => Promise<R & { total: number }>,
  config: Config<T>
): Promise<R> => {
  const {
    params,
    dataName = 'records',
    generateParams,
    maxRequestSize,
    pollingInterval,
    pollingSuccessCallback,
    pollingFailCallback
  } = config;
  // 第一页数据
  const firstData = await service(params);
  // TODO: 目前直取对象，对 布尔值 以及 undefined 不做处理
  if (typeof firstData === 'object') {
    // 总数大于最大请求数量，则轮询获取所有数据在返回
    if (maxRequestSize < firstData?.total) {
      // 计算出需要请求的页数
      const totalPage = Math.ceil(firstData.total / maxRequestSize);
      // 生成所有请求函数，为后续并发请求做准备
      const allParams = new Array(totalPage - 1).fill(0).map((_, index) => {
        // 从第二页开始请求
        const newParams = generateParams(index + 2, params);
        return service.bind(null, newParams);
      });
      try {
        // 并发请求所有数据
        const allData: { [key: string]: any } = await concurrentRequest(allParams, {
          maxRequestSize,
          pollingInterval
        });
        // 合并数据,保证第一页数据在最前面
        allData['-1'] = firstData;
        // 根据 key 排序, 取出所有的 dataName 字段,并打平
        const resultData = Object.entries(allData)
          .sort((a, b) => Number(a[0]) - Number(b[0]))
          .map((item) => item[1][dataName])
          .flat();
        // 调用成功回调
        pollingSuccessCallback?.(resultData);
        return {
          ...firstData,
          size: firstData.total,
          // 这里返回了所有的数据
          [dataName]: resultData
        };
      } catch (error) {
        pollingFailCallback?.(error);
      }
    } else {
      // 否则直接返回数据
      return firstData;
    }
  } else {
    return firstData;
  }
};
