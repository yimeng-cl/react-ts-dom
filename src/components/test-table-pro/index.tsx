import { InputNumber, ProColumns, Space, TablePro, Tag } from "@cffe/h2o-design";
import React from "react";

export type TableListItem = {
  key: number;
  name: string;
  containers: number;
  creator: string;
  status: string;
  createdAt: number;
  memo: string;
};
export default function TestTablePro() {
  const tableListDataSource: any[] = [];

  const creators = ["付小小", "曲丽丽", "林东东", "陈帅帅", "兼某某"];
  const valueEnum: any = {
    0: "close",
    1: "running",
    2: "online",
    3: "error",
  };
  for (let i = 0; i < 2; i += 1) {
    tableListDataSource.push({
      key: i,
      name: {
        enName: "AppName",
      },
      containers: Math.floor(Math.random() * 20),
      creator: creators[Math.floor(Math.random() * creators.length)],
      status: valueEnum[Math.floor(Math.random() * 10) % 4],
      createdAt: Date.now() - Math.floor(Math.random() * 100000),
      memo: i % 2 === 1 ? "很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长很长的文字要展示但是要留下尾巴" : "简短备注文案",
    });
  }

  const columns: ProColumns<TableListItem>[] = [
    {
      title: "应用名称",
      width: 100,
      dataIndex: ["name", "enName"],
      fixed: "left",
      render: _ => {
        // console.log(_);

        return <a>{_}</a>;
      },
    },

    {
      title: "容器数量",
      width: 120,
      dataIndex: "containers",
      align: "right",
      sorter: (a, b) => a.containers - b.containers,
    },
    {
      title: "状态",
      width: 100,
      dataIndex: "status",
      initialValue: "all",
      render: (dom, record, index, action, schema) => {
        console.log(dom, "dom");

        // console.log(dom, record, index, action, schema);

        // const textDom = schema.valueEnum[record["status"]];
        // return <Tag color={textDom.status}>{textDom.text}</Tag>;
        return dom;
      },
      valueEnum: {
        all: { text: "全部", status: "default" },
        close: { text: "关闭", status: "default" },
        running: { text: "运行中", status: "processing" },
        online: { text: "已上线", status: "success" },
        error: { text: "异常", status: "error" },
      },
    },
    {
      title: "创建者",
      width: 80,
      dataIndex: "creator",
      valueEnum: {
        all: { text: "全部" },
        付小小: { text: "付小小" },
        曲丽丽: { text: "曲丽丽" },
        林东东: { text: "林东东111" },
        陈帅帅: { text: "陈帅帅111" },
        兼某某: { text: "兼某某111" },
      },
      filters: [
        { text: "付小小xxxxxx", value: "付小小" },
        { text: "林东东xxxxxx", value: "林东东" },
      ],
      onFilter: (value, record) => record.creator === value,
    },
    {
      title: (
        <>
          创建时间
          {/* <Tooltip placement="top" title="这是一段描述">
            <QuestionCircleOutlined style={{ marginLeft: 4 }} />
          </Tooltip> */}
        </>
      ),
      width: 140,
      key: "since",
      dataIndex: "createdAt",
      valueType: "date",
      sorter: (a, b) => a.createdAt - b.createdAt,
    },
    {
      width: 180,
      title: "备注",
      dataIndex: "memo",
      ellipsis: true,
      // copyable: true,
    },
    {
      title: "操作",
      width: 180,
      dataIndex: "option",
      key: "option",
      fixed: "right",
      valueType: "option",
      render: () => (
        <div>
          <Space size={12}>
            <a key='link'>链路</a>
            <a key='link2'>报警</a>
            <a key='link3'>监控</a>
          </Space>
        </div>
      ),
    },
  ];
  return (
    <div>
      <InputNumber precision={2} />
      <TablePro
        columns={columns}
        headerStyle={{
          paddingTop: 0,
        }}
        dataSource={tableListDataSource}
        search={false}
        rowKey='key'
        headerTitle='表格标题'
        onColumnChange={columns => {
          console.log(columns);
        }}
        userColumnsConfig={{
          showUserColumnsConfig: true,
          tableId: "basic-table-demo",
          defaultColumnsConfigList: [
            {
              dataIndex: ["name", "enName"],
              isDisplay: false,
            },
            {
              dataIndex: "containers",
              isDisplay: true,
            },
            {
              dataIndex: "status",
              isDisplay: true,
            },
            {
              dataIndex: "creator",
              isDisplay: true,
            },
            {
              dataIndex: "createdAt",
              isDisplay: false,
            },
            {
              dataIndex: "memo",
              isDisplay: true,
            },
            {
              dataIndex: "option",
              isDisplay: true,
            },
          ],
          // columnsConfigLis:
          onColumnsConfigSave: (columnsConfigList: any) => {
            console.log(columnsConfigList);
            return Promise.resolve();
          },
        }}
      />
    </div>
  );
}
