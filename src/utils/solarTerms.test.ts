import { calculateSolarTerm, getSolarTermDisplayText, getSolarTermDescription } from './solarTerms';

// 简单的测试函数
console.log('=== 节气计算工具函数测试 ===');

// 测试夏至（6月21日）
const summerSolstice = calculateSolarTerm('2024-06-21');
console.log('2024年6月21日:', summerSolstice);
console.log('显示文本:', getSolarTermDisplayText(summerSolstice!));
console.log('直接拼接:', `${summerSolstice!.name}${summerSolstice!.position}`);
console.log('描述:', getSolarTermDescription(summerSolstice!));

// 测试春分（3月20日）
const springEquinox = calculateSolarTerm('2024-03-20');
console.log('\n2024年3月20日:', springEquinox);
console.log('显示文本:', getSolarTermDisplayText(springEquinox!));
console.log('直接拼接:', `${springEquinox!.name}${springEquinox!.position}`);

// 测试一个非节气日期（比如5月15日）
const randomDate = calculateSolarTerm('2024-05-15');
console.log('\n2024年5月15日:', randomDate);
console.log('显示文本:', getSolarTermDisplayText(randomDate!));
console.log('直接拼接:', `${randomDate!.name}${randomDate!.position}`);

// 测试冬季日期（1月1日）
const newYear = calculateSolarTerm('2024-01-01');
console.log('\n2024年1月1日:', newYear);
console.log('显示文本:', getSolarTermDisplayText(newYear!));
console.log('直接拼接:', `${newYear!.name}${newYear!.position}`);

console.log('\n=== 测试完成 ===');