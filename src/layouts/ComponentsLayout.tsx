import React from "react";
import { Link } from "react-router-dom";
import { Menu } from "antd";
import { BgColorsOutlined, BugOutlined } from "@ant-design/icons";

const ComponentsLayout: React.FC = () => {
  return (
    <Menu mode='inline'>
      <Menu.Item key='/components/css-style-test' icon={<BgColorsOutlined />}>
        <Link to='/components/css-style-test'>CSS样式测试</Link>
      </Menu.Item>
      <Menu.Item key='/components/async-validator-test' icon={<BugOutlined />}>
        <Link to='/components/async-validator-test'>Async-Validator测试</Link>
      </Menu.Item>
    </Menu>
  );
};

export default ComponentsLayout;
