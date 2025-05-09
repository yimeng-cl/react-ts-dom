
/**
 *
 * 1、 先发送一次请求。总数大于最大请求数量，则轮询获取所有数据在返回
    2、 计算出需要请求的页数
    3、  生成所有请求函数，为后续并发请求做准备
 */

type Service<T, R> = (params: T) => Promise<R & { total: number }>;
type MergeRequiredProps<T, R> = {
  service: Service<T, R>
  config: {
    params: T;
    maxSize: number
    generateParams: (current: number, params: T) => T
  }
}
const mergeRequired = async <T, R>({
  service,
  config
}: MergeRequiredProps<T, R>) => {
  const { params, maxSize, generateParams } = config
  const firstData = await service(params)
  if (firstData.total <= maxSize) {
    return firstData
  }
  const totalPage = Math.ceil(firstData.total / maxSize);
  const allService = Array.from({
    length: totalPage - 1
  }).map((e, index) => {
    const currentParams = generateParams(index, params)
    return {
      service: () => service(currentParams),
      index
    }
  })
  syncAllRequired(allService, {
    maxSize
  })
}

const syncAllRequired = async <T, R>(allService: ({
  service: () => Promise<R & { total: number }>;
  index: number
})[], config: {
  maxSize: number
}) => {
  const { maxSize } = config
  let pool = maxSize
  const results: { [key: string]: R } = {}
  const total = allService.length
  return new Promise((resolve, reject) => {
    if (total === 0) {
      resolve(results)
      return;
    }
    const interval = setInterval(() => {
      if (Object.keys(results).length === total) {
        clearInterval(interval);
        resolve(results)
        return;
      }
      while (pool > 0 && allService.length > 0) {
        const { service, index: currentIndex } = allService.shift()!
        pool--
        service().then(res => {
          results[currentIndex] = res;
        }).catch((error) => {
          clearInterval(interval)
          reject(error)
        })
          .finally(() => {
            pool++
          })
      }
    }, 200);
  })

}