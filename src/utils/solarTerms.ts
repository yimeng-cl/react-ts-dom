import dayjs, { Dayjs } from 'dayjs';
import {
  getPreciseSolarTerms,
  isYearInPreciseRange,
  SolarTermData as PreciseSolarTermData
} from './solarTermsData';

// 二十四节气的太阳黄经度数（从春分开始，每15度一个节气）
export const SOLAR_TERMS_DATA = [
  { name: '春分', longitude: 0, season: '春季', description: '昼夜平分，春暖花开' },
  { name: '清明', longitude: 15, season: '春季', description: '天气晴明，适宜踏青扫墓' },
  { name: '谷雨', longitude: 30, season: '春季', description: '雨生百谷，播种关键期' },
  { name: '立夏', longitude: 45, season: '夏季', description: '夏季开始，气温升高' },
  { name: '小满', longitude: 60, season: '夏季', description: '麦类作物籽粒渐饱满' },
  { name: '芒种', longitude: 75, season: '夏季', description: '麦收忙种，农事繁忙' },
  { name: '夏至', longitude: 90, season: '夏季', description: '北半球白昼最长，太阳直射北回归线' },
  { name: '小暑', longitude: 105, season: '夏季', description: '天气渐热，但未至极热' },
  { name: '大暑', longitude: 120, season: '夏季', description: '一年中最热的时期' },
  { name: '立秋', longitude: 135, season: '秋季', description: '秋季开始，暑去凉来' },
  { name: '处暑', longitude: 150, season: '秋季', description: '暑热结束，天气转凉' },
  { name: '白露', longitude: 165, season: '秋季', description: '露水增多，天气转凉' },
  { name: '秋分', longitude: 180, season: '秋季', description: '昼夜平分，秋高气爽' },
  { name: '寒露', longitude: 195, season: '秋季', description: '露水更凉，深秋来临' },
  { name: '霜降', longitude: 210, season: '秋季', description: '开始降霜，天气更冷' },
  { name: '立冬', longitude: 225, season: '冬季', description: '冬季开始，万物收藏' },
  { name: '小雪', longitude: 240, season: '冬季', description: '开始降雪，但雪量不大' },
  { name: '大雪', longitude: 255, season: '冬季', description: '降雪增多，天寒地冻' },
  { name: '冬至', longitude: 270, season: '冬季', description: '北半球白昼最短，太阳直射南回归线' },
  { name: '小寒', longitude: 285, season: '冬季', description: '天气寒冷，但未至极寒' },
  { name: '大寒', longitude: 300, season: '冬季', description: '一年中最冷的时期' },
  { name: '立春', longitude: 315, season: '春季', description: '春季开始，万物复苏' },
  { name: '雨水', longitude: 330, season: '春季', description: '降雨增多，气温回升' },
  { name: '惊蛰', longitude: 345, season: '春季', description: '春雷惊醒蛰虫，万物萌动' }
];

export interface SolarTerm {
  name: string;
  date: Dayjs;
  longitude: number;
  season: string;
  description: string;
}

export interface SolarTermResult {
  currentTerm: string;
  nextTerm: string;
  daysToNext: number;
  progress: number;
  season: string;
  description: string;
}

// 节气信息接口
export interface SolarTermInfo {
  name: string;
  longitude: number;
  season: string;
  description: string;
  date: string; // 节气的具体日期
  dayjs: Dayjs; // 节气的dayjs对象
  position: '' | '前' | '后';
  daysToTerm: number; // 距离节气的天数
}

/**
 * 获取指定年份的所有节气
 * @param year - 年份
 * @returns 该年份所有节气的详细信息
 */
export function getYearSolarTerms(year: number): SolarTerm[] {
  // 优先使用精确数据
  if (isYearInPreciseRange(year)) {
    const preciseData = getPreciseSolarTerms(year);
    if (preciseData) {
      return preciseData.map(term => {
        const termInfo = SOLAR_TERMS_DATA.find(t => t.name === term.name);
        return {
          name: term.name,
          date: dayjs(term.date),
          longitude: termInfo?.longitude || 0,
          season: termInfo?.season || '未知',
          description: termInfo?.description || ''
        };
      });
    }
  }

  // 如果没有精确数据，使用计算方法
  return calculateYearSolarTermsWithAlgorithm(year);
}

/**
 * 使用算法计算年份节气（备用方法）
 */
function calculateYearSolarTermsWithAlgorithm(year: number): SolarTerm[] {
  const terms: SolarTerm[] = [];

  // 基于2025年数据进行线性插值计算
  const baseYear = 2025;
  const baseTerms = [
    { name: '小寒', date: '2025-01-05 10:29:14' },
    { name: '大寒', date: '2025-01-20 04:30:16' },
    { name: '立春', date: '2025-02-03 22:10:13' },
    { name: '雨水', date: '2025-02-18 18:06:18' },
    { name: '惊蛰', date: '2025-03-05 16:07:02' },
    { name: '春分', date: '2025-03-20 17:01:13' },
    { name: '清明', date: '2025-04-04 20:48:21' },
    { name: '谷雨', date: '2025-04-20 03:55:45' },
    { name: '立夏', date: '2025-05-05 13:56:57' },
    { name: '小满', date: '2025-05-21 02:54:23' },
    { name: '芒种', date: '2025-06-05 17:56:16' },
    { name: '夏至', date: '2025-06-21 10:42:00' },
    { name: '小暑', date: '2025-07-07 04:04:43' },
    { name: '大暑', date: '2025-07-22 21:29:11' },
    { name: '立秋', date: '2025-08-07 13:51:19' },
    { name: '处暑', date: '2025-08-23 04:33:35' },
    { name: '白露', date: '2025-09-07 16:51:41' },
    { name: '秋分', date: '2025-09-23 02:19:04' },
    { name: '寒露', date: '2025-10-08 08:40:57' },
    { name: '霜降', date: '2025-10-23 11:50:39' },
    { name: '立冬', date: '2025-11-07 12:03:48' },
    { name: '小雪', date: '2025-11-22 09:35:18' },
    { name: '大雪', date: '2025-12-07 05:04:20' },
    { name: '冬至', date: '2025-12-21 23:02:48' }
  ];

  for (const baseTerm of baseTerms) {
    const baseDate = dayjs(baseTerm.date);
    // 简单的年度偏移计算（每年约365.25天）
    const yearOffset = year - baseYear;
    const estimatedDate = baseDate.add(yearOffset * 365.25, 'day');

    const termInfo = SOLAR_TERMS_DATA.find(t => t.name === baseTerm.name);
    terms.push({
      name: baseTerm.name,
      date: estimatedDate,
      longitude: termInfo?.longitude || 0,
      season: termInfo?.season || '未知',
      description: termInfo?.description || ''
    });
  }

  return terms;
}

/**
 * 计算指定日期的节气信息
 * @param date - 指定日期
 * @returns 节气计算结果
 */
export function calculateSolarTerm(date: Dayjs): SolarTermResult {
  const year = date.year();
  const yearTerms = getYearSolarTerms(year);

  // 获取前一年的最后几个节气和下一年的前几个节气，处理跨年情况
  const prevYearTerms = getYearSolarTerms(year - 1).slice(-3);
  const nextYearTerms = getYearSolarTerms(year + 1).slice(0, 3);

  // 合并所有节气
  const allTerms = [...prevYearTerms, ...yearTerms, ...nextYearTerms];

  // 找到当前日期所在的节气区间
  let currentTerm = '';
  let nextTerm = '';
  let daysToNext = 0;
  let progress = 0;

  for (let i = 0; i < allTerms.length - 1; i++) {
    const currentTermDate = allTerms[i].date;
    const nextTermDate = allTerms[i + 1].date;

    if (date.isSame(currentTermDate, 'day') || (date.isAfter(currentTermDate) && date.isBefore(nextTermDate))) {
      currentTerm = allTerms[i].name;
      nextTerm = allTerms[i + 1].name;
      daysToNext = nextTermDate.diff(date, 'day');

      // 计算进度（当前节气区间内的进度百分比）
      const totalDays = nextTermDate.diff(currentTermDate, 'day');
      const passedDays = date.diff(currentTermDate, 'day');
      progress = totalDays > 0 ? (passedDays / totalDays) * 100 : 0;
      break;
    }
  }

  // 如果没有找到，使用最近的节气
  if (!currentTerm) {
    const currentYearTerms = yearTerms;
    let closestTerm = currentYearTerms[0];
    let minDiff = Math.abs(date.diff(closestTerm.date, 'day'));

    for (const term of currentYearTerms) {
      const diff = Math.abs(date.diff(term.date, 'day'));
      if (diff < minDiff) {
        minDiff = diff;
        closestTerm = term;
      }
    }

    currentTerm = closestTerm.name;
    const currentIndex = currentYearTerms.findIndex(t => t.name === currentTerm);
    const nextIndex = (currentIndex + 1) % currentYearTerms.length;
    nextTerm = currentYearTerms[nextIndex].name;
    daysToNext = currentYearTerms[nextIndex].date.diff(date, 'day');
    progress = 0;
  }

  const termInfo = SOLAR_TERMS_DATA.find(t => t.name === currentTerm);

  return {
    currentTerm,
    nextTerm,
    daysToNext: Math.max(0, daysToNext),
    progress: Math.max(0, Math.min(100, progress)),
    season: termInfo?.season || '未知',
    description: termInfo?.description || ''
  };
}

/**
 * 获取季节信息
 */
export function getSeasonInfo(month: number) {
  if (month >= 3 && month <= 5) return { name: '春季', color: '#52c41a' };
  if (month >= 6 && month <= 8) return { name: '夏季', color: '#ff4d4f' };
  if (month >= 9 && month <= 11) return { name: '秋季', color: '#fa8c16' };
  return { name: '冬季', color: '#1890ff' };
}

/**
 * 按季节分组获取节气
 */
export function getTermsBySeason() {
  const seasons = {
    春季: [] as typeof SOLAR_TERMS_DATA,
    夏季: [] as typeof SOLAR_TERMS_DATA,
    秋季: [] as typeof SOLAR_TERMS_DATA,
    冬季: [] as typeof SOLAR_TERMS_DATA,
  };

  SOLAR_TERMS_DATA.forEach(term => {
    seasons[term.season as keyof typeof seasons].push(term);
  });

  return seasons;
}

/**
 * 获取节气显示文本
 */
export function getSolarTermDisplayText(solarTerm: SolarTermInfo): string {
  if (solarTerm.daysToTerm === 0) {
    return `今天是${solarTerm.name}`;
  } else if (solarTerm.position === '后') {
    return `${solarTerm.name}后${solarTerm.daysToTerm}天`;
  } else {
    return `${solarTerm.name}前${solarTerm.daysToTerm}天`;
  }
}

/**
 * 获取节气描述
 */
export function getSolarTermDescription(solarTerm: SolarTermInfo): string {
  return solarTerm.description;
}

/**
 * 将SolarTermResult转换为SolarTermInfo格式（适配函数）
 * @param date - 当前日期
 * @param result - calculateSolarTerm的返回结果
 * @returns SolarTermInfo格式的节气信息
 */
export function convertToSolarTermInfo(date: Dayjs, result: SolarTermResult): SolarTermInfo {
  const year = date.year();
  const yearTerms = getYearSolarTerms(year);

  // 找到当前节气的详细信息
  const currentTermData = yearTerms.find(term => term.name === result.currentTerm);
  const termInfo = SOLAR_TERMS_DATA.find(t => t.name === result.currentTerm);

  if (!currentTermData || !termInfo) {
    // 如果找不到，返回默认值
    return {
      name: result.currentTerm || '未知',
      longitude: 0,
      season: result.season || '未知',
      description: result.description || '',
      date: date.format('YYYY-MM-DD'),
      dayjs: date,
      position: '',
      daysToTerm: 0
    };
  }

  // 计算位置和距离天数
  const termDate = currentTermData.date;
  const diffDays = Math.abs(date.diff(termDate, 'day'));
  const position = date.isBefore(termDate) ? '前' : date.isAfter(termDate) ? '后' : '';

  return {
    name: result.currentTerm,
    longitude: termInfo.longitude,
    season: result.season,
    description: result.description,
    date: termDate.format('YYYY-MM-DD'),
    dayjs: termDate,
    position: position,
    daysToTerm: diffDays
  };
}