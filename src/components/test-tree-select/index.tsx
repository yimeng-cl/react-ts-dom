import type { TreeSelectProps } from "antd";
import { TreeSelect } from "antd";
import type { DefaultOptionType } from "antd/es/select";
import React, { useState } from "react";

const TestTreeSelect: React.FC = () => {
  const [value, setValue] = useState<string>();
  const [treeData, setTreeData] = useState<Omit<DefaultOptionType, "label">[]>([
    { id: 1, pId: 0, value: "1", title: "Expand to load", myKey: "mykey" },
    { id: 2, pId: 0, value: "2", title: "Expand to load" },
    { id: 4, pId: 2, value: "4", title: "Expand to load aas" },
    { id: 3, pId: 0, value: "3", title: "Tree Node", isLeaf: true },
  ]);

  const genTreeNode = (parentId: number, isLeaf = false) => {
    const random = Math.random().toString(36).substring(2, 6);
    return {
      id: random,
      pId: parentId,
      value: random,
      title: isLeaf ? "Tree Node" : "Expand to load",
      isLeaf,
    };
  };

  const onLoadData: TreeSelectProps["loadData"] = node =>
    new Promise(resolve => {
      const id = node.id;
      console.log(node);

      setTimeout(() => {
        console.log(treeData, "treeData");

        setTreeData(treeData.concat([genTreeNode(id, false), genTreeNode(id, true), genTreeNode(id, true)]));
        resolve(undefined);
      }, 300);
    });

  const onChange = (newValue: string) => {
    console.log(newValue);
    setValue(newValue);
  };

  return <TreeSelect treeDataSimpleMode style={{ width: "100%" }} value={value} onChange={onChange} loadData={onLoadData} treeData={treeData} />;
};

export default TestTreeSelect;
