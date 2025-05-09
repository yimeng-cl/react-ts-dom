import { Menu } from 'antd';
import React from 'react'

export default function TestMenu() {
  return (
    <div style={{ padding: '20px',width: '200px' }}>
      <Menu
        mode='horizontal'
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
    </div>
  );
}
