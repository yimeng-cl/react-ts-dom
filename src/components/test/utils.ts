import type { IInAmountType, IOption, IValue } from './type';

export const tableColumns = [
  {
    title: '给药方式名称',
    dataIndex: 'usageName',
    key: 'usageName',
    width: 150
  },
  {
    title: '用法分类',
    dataIndex: 'usageTypeName',
    key: 'usageTypeName',
    width: 150
  },
  {
    title: '适用范围',
    dataIndex: 'forRangeName',
    key: 'forRangeName',
    width: 300
  },
  {
    title: '入量方式',
    dataIndex: 'inAmountName',
    key: 'inAmountName'
  }
];

/**
 * 获取 realTypeOption
 * @param isUseCustomOptions 是否适用自定义值域
 * @param typeOptions 自定义值域
 * @param value 当前组件的值
 * @returns realTypeOption
 */
export const getRealTypeOption = (typeOptions: IOption[] = [], value?: IValue[]): IOption[] => {
  // 进入到这个方法，就已经是需要用自定义值域了
  const inTakeType = value?.[0]?.inTakeType;
  const realTypeOption = typeOptions?.filter(
    (item) => !item.hidden || item?.value === inTakeType || item?.value === inTakeType?.[0]
  );
  return realTypeOption;
};

/**
 * 获取 inTakeTypeOption
 * @param inTakeTypeOption 数据元中带有的值域
 * @param inAmountType 业务类型
 * @returns 过滤后的入量类型 filterInTakeTypeOption
 */
export const getInTakeTypeOption = (inTakeTypeOption: IOption[] = [], inAmountType: IInAmountType = 'adult') => {
  // 进入到这个方法，就是用数据元值域
  const filterInTakeTypeOption = inTakeTypeOption?.filter((item) => item.dictType === inAmountType);
  return filterInTakeTypeOption;
};

export const postQueryUserType = async () => {
  return new Promise((resolve) => {
    setTimeout(() => {
      resolve({
        data: [
          {
            id: '1',
            name: '成人'
          },
          {
            id: '2',
            name: '儿童'
          }
        ]
      });
    }, 1000);
  });
}