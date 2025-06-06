import {
  calculateSolarTerm,
  getSolarTermName,
  getAllSolarTerms,
  isSolarTermDay
} from './solarTermsUtils';

// 使用示例

// 1. 基础用法：计算指定日期的节气信息
console.log('=== 基础用法示例 ===');

// 使用字符串日期
const result1 = calculateSolarTerm('2024-02-04');
console.log('2024-02-04:', result1);
// 输出: { result: '立春', type: 'success', description: '今天正是立春节气' }

// 使用Date对象
const result2 = calculateSolarTerm(new Date('2024-02-10'));
console.log('2024-02-10:', result2);
// 输出: { result: '立春后', type: 'info', description: '距离立春已过6天' }

// 使用moment对象
import moment from 'moment';
const result3 = calculateSolarTerm(moment('2024-02-11'));
console.log('2024-02-11:', result3);
// 输出: { result: '雨水前', type: 'info', description: '距离雨水还有8天' }

// 2. 简化用法：只获取节气名称
console.log('\n=== 简化用法示例 ===');

const termName1 = getSolarTermName('2024-02-04');
console.log('2024-02-04 节气:', termName1); // 输出: '立春'

const termName2 = getSolarTermName('2024-06-05');
console.log('2024-06-05 节气:', termName2); // 输出: '芒种'

const termName3 = getSolarTermName('2024-02-10');
console.log('2024-02-10 节气:', termName3); // 输出: '立春后'

// 3. 检查是否为节气当天
console.log('\n=== 节气当天检查示例 ===');

const isTermDay1 = isSolarTermDay('2024-02-04');
console.log('2024-02-04 是否为节气当天:', isTermDay1); // 输出: true

const isTermDay2 = isSolarTermDay('2024-02-05');
console.log('2024-02-05 是否为节气当天:', isTermDay2); // 输出: false

// 4. 获取指定年份的所有节气
console.log('\n=== 获取年份节气列表示例 ===');

const terms2024 = getAllSolarTerms(2024);
console.log('2024年节气数量:', terms2024.length); // 输出: 24
console.log('2024年前三个节气:', terms2024.slice(0, 3));
// 输出: [
//   { name: '小寒', date: '2024-01-06' },
//   { name: '大寒', date: '2024-01-20' },
//   { name: '立春', date: '2024-02-04' }
// ]

// 获取当前年份的节气（不传参数）
const currentYearTerms = getAllSolarTerms();
console.log('当前年份节气数量:', currentYearTerms.length);

// 5. 实际应用场景示例
console.log('\n=== 实际应用场景示例 ===');

// 场景1：批量处理日期
const dates = ['2024-02-03', '2024-02-04', '2024-02-05', '2024-02-18', '2024-02-19'];
dates.forEach(date => {
  const result = calculateSolarTerm(date);
  console.log(`${date}: ${result.result} (${result.description})`);
});

// 场景2：查找某个月的节气
const findTermsInMonth = (year: number, month: number) => {
  const allTerms = getAllSolarTerms(year);
  return allTerms.filter(term => {
    const termDate = moment(term.date);
    return termDate.year() === year && termDate.month() + 1 === month;
  });
};

const februaryTerms = findTermsInMonth(2024, 2);
console.log('2024年2月的节气:', februaryTerms);

// 场景3：计算距离下一个节气的天数
const getNextTerm = (date: string) => {
  const inputDate = moment(date);
  const year = inputDate.year();
  const allTerms = getAllSolarTerms(year);

  for (const term of allTerms) {
    const termDate = moment(term.date);
    if (termDate.isAfter(inputDate)) {
      const daysToNext = termDate.diff(inputDate, 'days');
      return {
        nextTerm: term.name,
        daysToNext,
        date: term.date
      };
    }
  }

  // 如果当年没有下一个节气，查找下一年的第一个节气
  const nextYearTerms = getAllSolarTerms(year + 1);
  if (nextYearTerms.length > 0) {
    const firstTermNextYear = nextYearTerms[0];
    const termDate = moment(firstTermNextYear.date);
    const daysToNext = termDate.diff(inputDate, 'days');
    return {
      nextTerm: firstTermNextYear.name,
      daysToNext,
      date: firstTermNextYear.date
    };
  }

  return null;
};

const nextTerm = getNextTerm('2024-02-10');
console.log('2024-02-10 的下一个节气:', nextTerm);

// 6. 错误处理示例
console.log('\n=== 错误处理示例 ===');

// 无效日期
const invalidResult = calculateSolarTerm('invalid-date');
console.log('无效日期结果:', invalidResult);

// 不支持的年份
const unsupportedYear = calculateSolarTerm('2020-01-01');
console.log('不支持年份结果:', unsupportedYear);

export {
  // 导出示例函数供其他地方使用
  findTermsInMonth,
  getNextTerm
};