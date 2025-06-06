import React, { useState, useEffect } from "react";
import { DatePicker, Card, Typography, Row, Col, Tag, Space, Divider, Table, Button } from "antd";
import { CalendarOutlined, EnvironmentOutlined, TableOutlined } from "@ant-design/icons";
import dayjs from "dayjs";
import moment from "moment";
import {
  calculateSolarTerm,
  getSeasonInfo,
  getTermsBySeason,
  getSolarTermDisplayText,
  getSolarTermDescription,
  getYearSolarTerms,
  convertToSolarTermInfo,
  SolarTermInfo,
} from "../../utils/solarTerms";
import "./index.less";

const { Title, Text, Paragraph } = Typography;

const SolarTermsCalculator: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState(dayjs());
  const [solarTerm, setSolarTerm] = useState<SolarTermInfo | null>(null);
  const [showYearTable, setShowYearTable] = useState(false);
  const [yearTerms, setYearTerms] = useState<any[]>([]);

  // 计算节气
  useEffect(() => {
    const termResult = calculateSolarTerm(selectedDate);
    const term = convertToSolarTermInfo(selectedDate, termResult);
    setSolarTerm(term);

    // 获取当年所有节气
    const terms = getYearSolarTerms(selectedDate.year());
    setYearTerms(terms);
  }, [selectedDate]);

  // 处理日期选择
  const handleDateChange = (date: any) => {
    if (date) {
      // 将moment对象转换为dayjs对象
      const dayjsDate = dayjs(date.toDate());
      setSelectedDate(dayjsDate);
    }
  };

  // 处理节气点击（从节气一览表）
  const handleTermClick = (longitude: number) => {
    const currentYear = selectedDate.year();

    // 先尝试当前年份的节气
    let terms = getYearSolarTerms(currentYear);
    let targetTerm = terms.find(term => term.longitude === longitude);

    // 如果当前年份没找到，可能是跨年的节气（如立春、雨水、惊蛰）
    if (!targetTerm) {
      // 如果是立春、雨水、惊蛰（黄经315°、330°、345°），尝试下一年
      if (longitude >= 315) {
        terms = getYearSolarTerms(currentYear + 1);
        targetTerm = terms.find(term => term.longitude === longitude);
      } else {
        // 其他情况尝试上一年
        terms = getYearSolarTerms(currentYear - 1);
        targetTerm = terms.find(term => term.longitude === longitude);
      }
    }

    if (targetTerm) {
      setSelectedDate(targetTerm.date);
    }
  };

  // 处理年份节气表格中的日期点击
  const handleYearTermClick = (termDate: string) => {
    setSelectedDate(dayjs(termDate));
    setShowYearTable(false);
  };

  // 获取季节信息
  const seasonInfo = getSeasonInfo(selectedDate.month() + 1);
  const termsBySeason = getTermsBySeason();

  // 将dayjs转换为moment用于DatePicker
  const momentValue = selectedDate ? moment(selectedDate.format("YYYY-MM-DD")) : null;

  // 年份节气表格列定义
  const yearTermsColumns = [
    {
      title: "节气名称",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => <Tag color={getSeasonInfo(record.date.month() + 1).color}>{text}</Tag>,
    },
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
      render: (text: string, record: any) => (
        <Button type='link' onClick={() => handleYearTermClick(record.date.format("YYYY-MM-DD"))} style={{ padding: 0 }}>
          {record.date.format("MM月DD日")}
        </Button>
      ),
    },
    {
      title: "星期",
      key: "weekday",
      render: (record: any) => {
        const weekdays = ["日", "一", "二", "三", "四", "五", "六"];
        return `星期${weekdays[record.date.day()]}`;
      },
    },
    {
      title: "太阳黄经",
      dataIndex: "longitude",
      key: "longitude",
      render: (longitude: number) => `${longitude}°`,
    },
    {
      title: "季节",
      dataIndex: "season",
      key: "season",
    },
  ];

  return (
    <div className='solar-terms-calculator'>
      <Card className='main-card'>
        <Title level={2} className='title'>
          <CalendarOutlined /> 二十四节气计算器
        </Title>

        <Row gutter={[24, 24]}>
          {/* 左侧：日期选择和结果显示 */}
          <Col xs={24} lg={12}>
            <Card className='date-card'>
              <Space direction='vertical' size='large' style={{ width: "100%" }}>
                <div>
                  <Text strong>选择日期：</Text>
                  <DatePicker
                    value={momentValue}
                    onChange={handleDateChange}
                    format='YYYY年MM月DD日'
                    style={{ width: "100%", marginTop: 8 }}
                    placeholder='请选择日期'
                  />
                </div>

                {solarTerm && (
                  <div className='result-section'>
                    <Divider orientation='left'>节气信息</Divider>

                    <div className='term-info'>
                      <Space align='center' size='middle'>
                        <Tag color={seasonInfo.color} className='season-tag'>
                          {solarTerm.season}
                        </Tag>
                        <Title level={3} className='term-name'>
                          {getSolarTermDisplayText(solarTerm)}
                        </Title>
                      </Space>

                      <Paragraph className='term-description'>
                        <EnvironmentOutlined /> {getSolarTermDescription(solarTerm)}
                      </Paragraph>

                      <div className='term-details'>
                        <Text type='secondary'>
                          太阳黄经：{solarTerm.longitude}° | 精确日期：{solarTerm.date}
                        </Text>
                      </div>

                      {solarTerm.daysToTerm !== undefined && solarTerm.daysToTerm > 0 && (
                        <div className='days-info'>
                          <Text type='secondary'>
                            {solarTerm.position === "前"
                              ? `还有 ${solarTerm.daysToTerm} 天到达${solarTerm.name}`
                              : `${solarTerm.name}已过去 ${solarTerm.daysToTerm} 天`}
                          </Text>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                <div>
                  <Button type='primary' icon={<TableOutlined />} onClick={() => setShowYearTable(!showYearTable)}>
                    {showYearTable ? "隐藏" : "查看"}
                    {selectedDate.year()}年节气表
                  </Button>
                </div>
              </Space>
            </Card>
          </Col>

          {/* 右侧：节气一览表 */}
          <Col xs={24} lg={12}>
            <Card className='terms-overview-card'>
              <Title level={4}>节气一览表</Title>
              <Text type='secondary' style={{ marginBottom: 16, display: "block" }}>
                点击节气名称可快速选择对应日期
              </Text>

              <div className='terms-by-season'>
                {Object.entries(termsBySeason).map(([season, terms]) => (
                  <div key={season} className='season-section'>
                    <Title level={5} className={`season-title season-${season}`}>
                      {season}
                    </Title>
                    <Row gutter={[8, 8]}>
                      {terms.map(term => (
                        <Col span={12} key={term.name}>
                          <div className='term-item' onClick={() => handleTermClick(term.longitude)}>
                            <div className='term-name'>{term.name}</div>
                            <div className='term-longitude'>黄经{term.longitude}°</div>
                          </div>
                        </Col>
                      ))}
                    </Row>
                  </div>
                ))}
              </div>
            </Card>
          </Col>
        </Row>

        {/* 年份节气详细表格 */}
        {showYearTable && (
          <Card style={{ marginTop: 24 }} title={`${selectedDate.year()}年二十四节气时间表`}>
            <Table dataSource={yearTerms} columns={yearTermsColumns} pagination={false} size='small' rowKey='name' />
          </Card>
        )}

        <Card className='info-card' style={{ marginTop: 24 }}>
          <Title level={4}>关于二十四节气</Title>
          <Paragraph>
            二十四节气是中国古代订立的一种用来指导农事的补充历法，是根据太阳在黄道上的位置来划分的。
            每个节气都对应着太阳到达黄经的特定度数，是一个精确的时间点。
          </Paragraph>
          <Paragraph>本计算器使用天文学算法，基于太阳黄经精确计算每年的节气时间， 考虑了地球公转轨道的椭圆性和其他天文因素，计算精度可达小时级别。</Paragraph>
          <Paragraph>
            <Text strong>计算原理：</Text>
            <br />
            • 春分：太阳黄经0° | 夏至：太阳黄经90°
            <br />
            • 秋分：太阳黄经180° | 冬至：太阳黄经270°
            <br />• 其他节气：每隔15°黄经一个节气
          </Paragraph>
        </Card>
      </Card>
    </div>
  );
};

export default SolarTermsCalculator;
