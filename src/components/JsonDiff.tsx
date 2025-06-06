import React, { useState } from "react";
import { Card, Typography, Space, Button } from "antd";
import { CaretRightOutlined, CaretDownOutlined } from "@ant-design/icons";
import styled from "styled-components";

const { Title } = Typography;

// 定义差异类型
interface DiffItem {
  type: "added" | "removed" | "modified";
  path: string;
  oldValue?: any;
  newValue?: any;
}

// 样式组件
const DiffContainer = styled.div`
  font-family: "Monaco", "Menlo", "Ubuntu Mono", "Consolas", "source-code-pro", monospace;
  font-size: 14px;
  line-height: 1.5;
  padding: 16px;
  background: #f5f5f5;
  border-radius: 4px;
  overflow-x: auto;
`;

interface DiffLineProps {
  type?: "added" | "removed" | "modified";
}

const DiffLine = styled.div<DiffLineProps>`
  padding: 2px 8px;
  margin: 2px 0;
  border-radius: 2px;
  background-color: ${(props: DiffLineProps) => {
    switch (props.type) {
      case "added":
        return "#e6ffed";
      case "removed":
        return "#ffeef0";
      case "modified":
        return "#fff8c5";
      default:
        return "transparent";
    }
  }};
`;

const Path = styled.span`
  color: #666;
  margin-right: 8px;
`;

interface ValueProps {
  type?: "added" | "removed" | "modified";
}

const Value = styled.span<ValueProps>`
  color: ${(props: ValueProps) => {
    switch (props.type) {
      case "added":
        return "#22863a";
      case "removed":
        return "#cb2431";
      case "modified":
        return "#b08800";
      default:
        return "#24292e";
    }
  }};
`;

const CollapsibleSection = styled.div`
  margin-left: 20px;
`;

const ToggleButton = styled(Button)`
  padding: 0;
  margin-right: 8px;
`;

// 主组件
const JsonDiff: React.FC<{ oldJson: any; newJson: any }> = ({ oldJson, newJson }) => {
  const [expandedPaths, setExpandedPaths] = useState<Set<string>>(new Set());

  // 比较两个对象并返回差异
  const compareObjects = (obj1: any, obj2: any, path: string = ""): DiffItem[] => {
    const differences: DiffItem[] = [];

    // 遍历第一个对象的所有属性
    for (let key in obj1) {
      const currentPath = path ? `${path}.${key}` : key;

      // 如果第二个对象没有这个属性
      if (!(key in obj2)) {
        differences.push({
          type: "removed",
          path: currentPath,
          oldValue: obj1[key],
          newValue: undefined,
        });
      }
      // 如果属性值不同
      else if (JSON.stringify(obj1[key]) !== JSON.stringify(obj2[key])) {
        if (typeof obj1[key] === "object" && obj1[key] !== null) {
          differences.push(...compareObjects(obj1[key], obj2[key], currentPath));
        } else {
          differences.push({
            type: "modified",
            path: currentPath,
            oldValue: obj1[key],
            newValue: obj2[key],
          });
        }
      }
    }

    // 检查第二个对象中的新增属性
    for (let key in obj2) {
      const currentPath = path ? `${path}.${key}` : key;
      if (!(key in obj1)) {
        differences.push({
          type: "added",
          path: currentPath,
          oldValue: undefined,
          newValue: obj2[key],
        });
      }
    }

    return differences;
  };

  // 获取差异
  const differences = compareObjects(oldJson, newJson);

  // 切换展开/折叠
  const togglePath = (path: string) => {
    const newExpandedPaths = new Set(expandedPaths);
    if (newExpandedPaths.has(path)) {
      newExpandedPaths.delete(path);
    } else {
      newExpandedPaths.add(path);
    }
    setExpandedPaths(newExpandedPaths);
  };

  // 渲染差异项
  const renderDiffItem = (diff: DiffItem) => {
    const isExpanded = expandedPaths.has(diff.path);
    const hasChildren = diff.type === "modified" && typeof diff.oldValue === "object" && diff.oldValue !== null;

    return (
      <DiffLine key={diff.path} type={diff.type}>
        {hasChildren && <ToggleButton type='text' icon={isExpanded ? <CaretDownOutlined /> : <CaretRightOutlined />} onClick={() => togglePath(diff.path)} />}
        <Path>{diff.path}:</Path>
        {diff.type === "added" && <Value type='added'>{JSON.stringify(diff.newValue)}</Value>}
        {diff.type === "removed" && <Value type='removed'>{JSON.stringify(diff.oldValue)}</Value>}
        {diff.type === "modified" && (
          <>
            {hasChildren ? (
              isExpanded && <CollapsibleSection>{compareObjects(diff.oldValue, diff.newValue, diff.path).map(renderDiffItem)}</CollapsibleSection>
            ) : (
              <>
                <Value type='removed'>{JSON.stringify(diff.oldValue)}</Value>
                {" → "}
                <Value type='added'>{JSON.stringify(diff.newValue)}</Value>
              </>
            )}
          </>
        )}
      </DiffLine>
    );
  };

  return (
    <Card>
      <Title level={4}>JSON 差异对比</Title>
      <Space direction='vertical' style={{ width: "100%" }}>
        <DiffContainer>{differences.map(renderDiffItem)}</DiffContainer>
      </Space>
    </Card>
  );
};

export default JsonDiff;
