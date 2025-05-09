import { Input, Tree } from "antd";
import type { DataNode, TreeProps } from "antd/es/tree";
import React, { useState } from "react";
import { generateTreeData, NodeType } from "./utils";

const defaultData = generateTreeData(4);

const TestTree: React.FC = () => {
  const [gData, setGData] = useState<NodeType[]>(defaultData);
  const [expandedKeys, setExpandedKeys] = useState<string[]>([]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const newExpandedKeys: string[] = [];
    const value = e.target.value;
    const resultData = filterTreeData(defaultData, value, newExpandedKeys);
    setGData(resultData);
    setExpandedKeys(newExpandedKeys);
  };

  const filterTreeData = (treeData: NodeType[], searchValue: string, expendKeys: string[]) => {
    return treeData.filter(item => {
      let children = item.children || [];
      children = filterTreeData(children, searchValue, expendKeys);

      if (item.title.includes(searchValue) || children.length > 0) {
        expendKeys.push(item.key);
        return true;
      }
      return false;
    });
  };

  const handleExpend = (
    expandedKeys: string[],
    { expanded: bool, node }: { expanded: { bool: boolean }; node: NodeType }
  ) => {
    if (bool) {
      expandedKeys.push(node.key);
    } else {
      expandedKeys = expandedKeys.filter(key => key !== node.key);
    }
    setExpandedKeys(expandedKeys);
  };
  return (
    <>
      <Input onChange={handleChange} />
      <Tree
        className='draggable-tree'
        expandedKeys={expandedKeys}
        treeData={gData}
        onExpand={handleExpend}
      />
    </>
  );
};

export default TestTree;
