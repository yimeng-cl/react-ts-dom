import { Diff } from "deep-diff";
import { isObject } from "lodash";

// 简化版的实现逻辑
function diff(oldObj: any, newObj: any): Diff[] {
  const differences: Diff[] = [];

  // 递归比较对象
  function compare(path: string[], oldVal: any, newVal: any) {
    // 如果两个值相同，直接返回
    if (oldVal === newVal) return;

    // 如果都是对象，递归比较
    if (isObject(oldVal) && isObject(newVal)) {
      // 比较所有属性
      const allKeys = new Set([...Object.keys(oldVal), ...Object.keys(newVal)]);
      for (const key of allKeys) {
        compare([...path, key], oldVal[key], newVal[key]);
      }
      return;
    }

    // 如果都是数组，比较数组差异
    if (Array.isArray(oldVal) && Array.isArray(newVal)) {
      // 比较数组元素
      // 处理新增、删除、修改的元素
      return;
    }

    // 记录差异
    if (oldVal === undefined) {
      differences.push({
        kind: 'N',
        path,
        lhs: undefined,
        rhs: newVal
      });
    } else if (newVal === undefined) {
      differences.push({
        kind: 'D',
        path,
        lhs: oldVal,
        rhs: undefined
      });
    } else {
      differences.push({
        kind: 'E',
        path,
        lhs: oldVal,
        rhs: newVal
      });
    }
  }

  compare([], oldObj, newObj);
  return differences;
}