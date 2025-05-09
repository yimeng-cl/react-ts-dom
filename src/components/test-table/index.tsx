import { Button, Menu, Space, Table, Tag } from "antd";
import type { ColumnsType } from "antd/es/table";
import React, { useEffect, useRef, useState } from "react";

interface DataType {
  key: string;
  name: string;
  age: number;
  address: string;
  tags: string;
}

const data: DataType[] = Array.from({ length: 2000 }, (_, key) => ({
  key: `${key}`,
  name: `名字 ${key}`,
  age: 32,
  address: "New York No. 1 Lake Park",
  tags: "reviewInfo",
}));

const TestTable: React.FC = () => {
  const [flag, setFlag] = useState(false);
  const [tableData, setTableData] = useState<DataType[]>([]);
  const columns: ColumnsType<DataType> = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
      width: "200px",
      render: text => <a>{text}</a>,
    },
    {
      title: "Age",
      dataIndex: "age",
      width: "100px",
      key: "age",
      defaultSortOrder: "descend",
      sorter: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      key: "address",
      width: "600px",
    },
    {
      title: "Action",
      key: "action",
      width: "100px",
    },
    {
      title: "Action",
      key: "action",
      width: "100px",
    },

    {
      title: "Tags",
      dataIndex: "tags",
      key: "tags",
      width: "100px",
    },
    {
      title: "Options",
      dataIndex: "options",
      key: "options",
      ellipsis: true,
      width: "160px",
      render: () => {
        return (
          <Menu
            mode='horizontal'
            onClick={handleClick}
            items={[
              {
                label: "审核",
                key: "approval",
              },
              {
                label: "编辑",
                key: "edit",
              },
              {
                label: "复制",
                key: "copy",
              },
              {
                label: "删除",
                key: "remove",
              },
            ]}
          />
        );
      },
    },
  ];

  const handleClick = () => {
    setFlag(!flag);
    console.log("click");
  };
  const getTableData = () => {
    setTableData(data);
  };

  return (
    <div style={{ height: "200px" }}>
      <Button onClick={getTableData}>click</Button>
      <Table columns={columns} dataSource={tableData} bordered scroll={{ y: 800 }} pagination={false} />
    </div>
  );
};

export default TestTable;
