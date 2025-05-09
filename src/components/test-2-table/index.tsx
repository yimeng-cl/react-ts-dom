import { Table } from "antd";
import React, { useRef } from "react";

const MyTable = () => {
  const columns = [
    {
      title: "Name",
      dataIndex: "name",
      key: "name",
    },

    {
      title: "Address",
      dataIndex: "address",
      key: "address",
    },
  ];

  const data = [
    {
      key: "1",
      name: "John Brown",

      address: "New York No. 1 Lake Park",
    },
    {
      key: "2",
      name: "Jim Green",

      address: "London No. 1 Lake Park",
    },
    {
      key: "3",
      name: "Joe Black",

      address: "Sidney No. 1 Lake Park",
    },
  ];

  return <Table columns={columns} dataSource={data} pagination={false} />;
};

export default function Test2Table() {
  const ref = useRef(null);

  const renderTable = () => {
    if (ref.current) {
      // 克隆表格
      const tableClone = ref.current.cloneNode(true);
      console.log(tableClone, "tableClone");
      // 获取 表格的高度
      const tableHeight = tableClone.offsetHeight - 20;
      // 如果表格高度超过 100px ,则将 表格最后一行删掉
      if (tableHeight > 100) {
        const lastRow = tableClone.querySelector("tr:last-child");
        lastRow.remove();
      }
      return tableClone;
    }
  };

  return (
    <div ref={ref}>
      <MyTable />
      {renderTable()}
    </div>
  );
}
