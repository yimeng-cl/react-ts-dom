import moment, { Moment } from 'moment';

// 节气数据类型定义
export interface SolarTerm {
  name: string;
  date: string;
}

// 计算结果类型定义
export interface SolarTermResult {
  result: string;
  type: 'success' | 'info' | 'warning' | 'error';
  description: string;
}

// 2023年二十四节气数据
const solarTerms2023: SolarTerm[] = [
  { name: '小寒', date: '2023-01-05' },
  { name: '大寒', date: '2023-01-20' },
  { name: '立春', date: '2023-02-04' },
  { name: '雨水', date: '2023-02-19' },
  { name: '惊蛰', date: '2023-03-06' },
  { name: '春分', date: '2023-03-21' },
  { name: '清明', date: '2023-04-05' },
  { name: '谷雨', date: '2023-04-20' },
  { name: '立夏', date: '2023-05-06' },
  { name: '小满', date: '2023-05-21' },
  { name: '芒种', date: '2023-06-06' },
  { name: '夏至', date: '2023-06-21' },
  { name: '小暑', date: '2023-07-07' },
  { name: '大暑', date: '2023-07-23' },
  { name: '立秋', date: '2023-08-08' },
  { name: '处暑', date: '2023-08-23' },
  { name: '白露', date: '2023-09-08' },
  { name: '秋分', date: '2023-09-23' },
  { name: '寒露', date: '2023-10-08' },
  { name: '霜降', date: '2023-10-24' },
  { name: '立冬', date: '2023-11-08' },
  { name: '小雪', date: '2023-11-23' },
  { name: '大雪', date: '2023-12-07' },
  { name: '冬至', date: '2023-12-22' }
];

// 2024年二十四节气数据
const solarTerms2024: SolarTerm[] = [
  { name: '小寒', date: '2024-01-06' },
  { name: '大寒', date: '2024-01-20' },
  { name: '立春', date: '2024-02-04' },
  { name: '雨水', date: '2024-02-19' },
  { name: '惊蛰', date: '2024-03-05' },
  { name: '春分', date: '2024-03-20' },
  { name: '清明', date: '2024-04-04' },
  { name: '谷雨', date: '2024-04-19' },
  { name: '立夏', date: '2024-05-05' },
  { name: '小满', date: '2024-05-20' },
  { name: '芒种', date: '2024-06-05' },
  { name: '夏至', date: '2024-06-21' },
  { name: '小暑', date: '2024-07-06' },
  { name: '大暑', date: '2024-07-22' },
  { name: '立秋', date: '2024-08-07' },
  { name: '处暑', date: '2024-08-22' },
  { name: '白露', date: '2024-09-07' },
  { name: '秋分', date: '2024-09-22' },
  { name: '寒露', date: '2024-10-08' },
  { name: '霜降', date: '2024-10-23' },
  { name: '立冬', date: '2024-11-07' },
  { name: '小雪', date: '2024-11-22' },
  { name: '大雪', date: '2024-12-07' },
  { name: '冬至', date: '2024-12-21' }
];

// 2025年二十四节气数据
const solarTerms2025: SolarTerm[] = [
  { name: '小寒', date: '2025-01-05' },
  { name: '大寒', date: '2025-01-20' },
  { name: '立春', date: '2025-02-03' },
  { name: '雨水', date: '2025-02-18' },
  { name: '惊蛰', date: '2025-03-05' },
  { name: '春分', date: '2025-03-20' },
  { name: '清明', date: '2025-04-04' },
  { name: '谷雨', date: '2025-04-19' },
  { name: '立夏', date: '2025-05-05' },
  { name: '小满', date: '2025-05-20' },
  { name: '芒种', date: '2025-06-05' },
  { name: '夏至', date: '2025-06-21' },
  { name: '小暑', date: '2025-07-06' },
  { name: '大暑', date: '2025-07-22' },
  { name: '立秋', date: '2025-08-07' },
  { name: '处暑', date: '2025-08-22' },
  { name: '白露', date: '2025-09-07' },
  { name: '秋分', date: '2025-09-22' },
  { name: '寒露', date: '2025-10-08' },
  { name: '霜降', date: '2025-10-23' },
  { name: '立冬', date: '2025-11-07' },
  { name: '小雪', date: '2025-11-22' },
  { name: '大雪', date: '2025-12-06' },
  { name: '冬至', date: '2025-12-21' }
];

/**
 * 根据年份获取对应的节气数据
 * @param year 年份
 * @returns 节气数据数组
 */
export const getSolarTermsByYear = (year: number): SolarTerm[] => {
  switch (year) {
    case 2023:
      return solarTerms2023;
    case 2024:
      return solarTerms2024;
    case 2025:
      return solarTerms2025;
    default:
      return solarTerms2024; // 默认返回2024年数据
  }
};

/**
 * 计算指定日期对应的节气信息
 * @param date 输入日期，支持字符串、Date对象或Moment对象
 * @returns 节气计算结果
 */
export const calculateSolarTerm = (date: string | Date | Moment): SolarTermResult => {
  // 统一转换为moment对象
  const selectedDate = moment(date);

  if (!selectedDate.isValid()) {
    return {
      result: '无效日期',
      type: 'error',
      description: '请提供有效的日期格式'
    };
  }

  const year = selectedDate.year();
  const solarTerms = getSolarTermsByYear(year);

  if (!solarTerms || solarTerms.length === 0) {
    return {
      result: '暂无该年份节气数据',
      type: 'warning',
      description: `${year}年的节气数据暂未收录，目前支持2023-2025年`
    };
  }

  const selectedMoment = selectedDate.clone().startOf('day');

  // 找到最接近的节气
  let closestTerm: SolarTerm | null = null;
  let minDiff = Infinity;

  for (let i = 0; i < solarTerms.length; i++) {
    const termDate = moment(solarTerms[i].date).startOf('day');
    const diff = Math.abs(selectedMoment.diff(termDate, 'days'));

    if (diff < minDiff) {
      minDiff = diff;
      closestTerm = solarTerms[i];
    }
  }

  if (!closestTerm) {
    return {
      result: '无法计算节气',
      type: 'error',
      description: '计算过程中出现错误'
    };
  }

  const termDate = moment(closestTerm.date).startOf('day');
  const daysDiff = selectedMoment.diff(termDate, 'days');

  // 如果是节气当天
  if (daysDiff === 0) {
    return {
      result: closestTerm.name,
      type: 'success',
      description: `今天正是${closestTerm.name}节气`
    };
  }

  // 如果在节气前后7天内
  if (Math.abs(daysDiff) <= 7) {
    if (daysDiff > 0) {
      // 选择日期在节气之后
      return {
        result: `${closestTerm.name}后`,
        type: 'info',
        description: `距离${closestTerm.name}已过${daysDiff}天`
      };
    } else {
      // 选择日期在节气之前
      return {
        result: `${closestTerm.name}前`,
        type: 'info',
        description: `距离${closestTerm.name}还有${Math.abs(daysDiff)}天`
      };
    }
  }

  // 如果超出7天范围，找到实际所处的节气区间
  let currentTerm: SolarTerm | null = null;
  let nextTerm: SolarTerm | null = null;

  for (let i = 0; i < solarTerms.length; i++) {
    const termDate = moment(solarTerms[i].date).startOf('day');

    if (selectedMoment.isSameOrAfter(termDate)) {
      currentTerm = solarTerms[i];
      nextTerm = solarTerms[i + 1] || null;
    } else {
      break;
    }
  }

  if (currentTerm && nextTerm) {
    const currentTermDate = moment(currentTerm.date).startOf('day');
    const nextTermDate = moment(nextTerm.date).startOf('day');
    const daysFromCurrent = selectedMoment.diff(currentTermDate, 'days');
    const daysToNext = nextTermDate.diff(selectedMoment, 'days');

    if (daysFromCurrent <= 7) {
      return {
        result: `${currentTerm.name}后`,
        type: 'info',
        description: `距离${currentTerm.name}已过${daysFromCurrent}天`
      };
    } else if (daysToNext <= 7) {
      return {
        result: `${nextTerm.name}前`,
        type: 'info',
        description: `距离${nextTerm.name}还有${daysToNext}天`
      };
    } else {
      return {
        result: `${currentTerm.name}与${nextTerm.name}之间`,
        type: 'info',
        description: `距离${currentTerm.name}已过${daysFromCurrent}天，距离${nextTerm.name}还有${daysToNext}天`
      };
    }
  }

  // 处理年初或年末的特殊情况
  if (currentTerm && !nextTerm) {
    const currentTermDate = moment(currentTerm.date).startOf('day');
    const daysFromCurrent = selectedMoment.diff(currentTermDate, 'days');

    return {
      result: `${currentTerm.name}后`,
      type: 'info',
      description: `距离${currentTerm.name}已过${daysFromCurrent}天`
    };
  }

  return {
    result: '无法确定节气',
    type: 'warning',
    description: '请选择有效的日期范围'
  };
};

/**
 * 简化版本：只返回节气名称的函数
 * @param date 输入日期
 * @returns 节气名称字符串
 */
export const getSolarTermName = (date: string | Date | Moment): string => {
  const result = calculateSolarTerm(date);
  return result.result;
};

/**
 * 获取指定年份的所有节气列表
 * @param year 年份，默认为当前年份
 * @returns 节气列表
 */
export const getAllSolarTerms = (year?: number): SolarTerm[] => {
  const targetYear = year || moment().year();
  return getSolarTermsByYear(targetYear);
};

/**
 * 检查指定日期是否为节气当天
 * @param date 输入日期
 * @returns 是否为节气当天
 */
export const isSolarTermDay = (date: string | Date | Moment): boolean => {
  const result = calculateSolarTerm(date);
  return result.type === 'success';
};