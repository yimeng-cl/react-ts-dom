import React, { useState, useEffect } from "react";
import { DatePicker, Card, Alert, Typography, Row, Col, Table, Tag } from "antd";
import moment, { Moment } from "moment";
import "moment/locale/zh-cn";
import { calculateSolarTerm, getSolarTermsByYear, SolarTermResult } from "../utils/solarTermsUtils";

const { Title, Text } = Typography;

// 设置moment为中文
moment.locale("zh-cn");

const SolarTermsCalculator: React.FC = () => {
  const [selectedDate, setSelectedDate] = useState<Moment>(moment());
  const [result, setResult] = useState<SolarTermResult | null>(null);

  // 计算节气结果
  useEffect(() => {
    if (selectedDate) {
      const calculationResult = calculateSolarTerm(selectedDate);
      setResult(calculationResult);
    }
  }, [selectedDate]);

  // 处理日期选择
  const handleDateChange = (date: Moment | null) => {
    if (date) {
      setSelectedDate(date);
    }
  };

  // 获取当前年份的节气数据用于显示
  const currentYearTerms = getSolarTermsByYear(selectedDate.year());

  // 准备表格数据
  const tableData = currentYearTerms.map((term, index) => ({
    key: index,
    name: term.name,
    date: moment(term.date).format("YYYY年MM月DD日"),
    isSelected: selectedDate && moment(term.date).isSame(selectedDate, "day"),
  }));

  // 表格列定义
  const columns = [
    {
      title: "节气名称",
      dataIndex: "name",
      key: "name",
      render: (text: string, record: any) => <Tag color={record.isSelected ? "blue" : "default"}>{text}</Tag>,
    },
    {
      title: "日期",
      dataIndex: "date",
      key: "date",
      render: (text: string, record: any) => <Text strong={record.isSelected}>{text}</Text>,
    },
  ];

  return (
    <div style={{ padding: "24px", maxWidth: "1200px", margin: "0 auto" }}>
      <Title level={2} style={{ textAlign: "center", marginBottom: "32px" }}>
        二十四节气计算器
      </Title>

      <Row gutter={[24, 24]}>
        <Col xs={24} lg={12}>
          <Card title='节气计算' style={{ height: "100%" }}>
            <div style={{ marginBottom: "24px" }}>
              <Text strong>选择日期：</Text>
              <DatePicker
                value={selectedDate}
                onChange={handleDateChange}
                style={{ width: "100%", marginTop: "8px" }}
                format='YYYY年MM月DD日'
                placeholder='请选择日期'
              />
            </div>

            {result && <Alert message={result.result} description={result.description} type={result.type} showIcon style={{ marginBottom: "16px" }} />}

            <div
              style={{
                padding: "16px",
                backgroundColor: "#f5f5f5",
                borderRadius: "6px",
                marginTop: "16px",
              }}
            >
              <Title level={5}>使用说明：</Title>
              <ul style={{ margin: 0, paddingLeft: "20px" }}>
                <li>选择任意日期，系统会自动计算对应的节气</li>
                <li>如果是节气当天，直接显示节气名称</li>
                <li>如果在节气前后7天内，显示"节气前"或"节气后"</li>
                <li>超出7天范围则显示所处的节气区间</li>
              </ul>
            </div>
          </Card>
        </Col>

        <Col xs={24} lg={12}>
          <Card title={`${selectedDate.year()}年二十四节气一览`} style={{ height: "100%" }}>
            {currentYearTerms.length > 0 ? (
              <Table dataSource={tableData} columns={columns} pagination={false} size='small' scroll={{ y: 400 }} />
            ) : (
              <Alert message='暂无数据' description={`${selectedDate.year()}年的节气数据暂未收录，目前支持2023-2025年`} type='warning' showIcon />
            )}
          </Card>
        </Col>
      </Row>
    </div>
  );
};

export default SolarTermsCalculator;
