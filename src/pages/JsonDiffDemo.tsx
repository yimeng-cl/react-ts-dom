import React, { useState } from "react";
import { Card, Input, Space, Button } from "antd";
import JsonDiff from "../components/JsonDiff";

const { TextArea } = Input;

const JsonDiffDemo: React.FC = () => {
  // 示例数据
  const [oldJson, setOldJson] = useState({
    name: "张三",
    age: 25,
    address: {
      city: "北京",
      street: "朝阳区",
    },
    hobbies: ["读书", "运动"],
    scores: {
      math: 90,
      english: 85,
    },
  });

  const [newJson, setNewJson] = useState({
    name: "李四",
    age: 26,
    address: {
      city: "上海",
      street: "浦东新区",
    },
    hobbies: ["读书", "音乐"],
    scores: {
      math: 95,
      chinese: 88,
    },
  });

  // 添加中间状态保存原始输入
  const [oldJsonInput, setOldJsonInput] = useState(JSON.stringify(oldJson, null, 2));
  const [newJsonInput, setNewJsonInput] = useState(JSON.stringify(newJson, null, 2));

  // 处理 JSON 输入
  const handleOldJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setOldJsonInput(value);
    try {
      const parsedValue = JSON.parse(value);
      console.log("🚀 ~一梦的log ~ handleOldJsonChange ~ parsedValue:", parsedValue);
      setOldJson(parsedValue);
    } catch (error) {
      console.log("🚀 ~一梦的log ~ handleOldJsonChange ~ error:", error);
      // 解析错误时不更新 oldJson 状态
    }
  };

  const handleNewJsonChange = (e: React.ChangeEvent<HTMLTextAreaElement>) => {
    const value = e.target.value;
    setNewJsonInput(value);
    try {
      const parsedValue = JSON.parse(value);
      setNewJson(parsedValue);
    } catch (error) {
      // 解析错误时不更新 newJson 状态
    }
  };

  return (
    <Space direction='vertical' size='large' style={{ width: "100%", padding: "24px" }}>
      <Card title='JSON 差异对比演示'>
        <Space direction='vertical' size='large' style={{ width: "100%" }}>
          <div>
            <h3>原始 JSON</h3>
            <TextArea rows={10} value={oldJsonInput} onChange={handleOldJsonChange} style={{ fontFamily: "monospace" }} />
          </div>
          <div>
            <h3>新 JSON</h3>
            <TextArea rows={10} value={newJsonInput} onChange={handleNewJsonChange} style={{ fontFamily: "monospace" }} />
          </div>
          <JsonDiff oldJson={oldJson} newJson={newJson} />
        </Space>
      </Card>
    </Space>
  );
};

export default JsonDiffDemo;
