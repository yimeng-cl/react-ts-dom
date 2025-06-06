import React from "react";
import { Outlet, useLocation, useNavigate } from "react-router-dom";
import { Menu } from "antd";

// 菜单分组配置，可根据实际需求调整
const menuItems = [
  {
    key: "base",
    label: "基础组件",
    children: [
      { key: "test", label: "test" },
      { key: "row-col", label: "row-col" },
      { key: "flex-box", label: "flex-box" },
      { key: "test-date", label: "test-date" },
      { key: "test-less", label: "test-less" },
      { key: "monaco-editor", label: "monaco-editor" },
      { key: "snake-game", label: "snake-game" },
      { key: "extract-text", label: "extract-text" },
    ],
  },
  {
    key: "form",
    label: "表单相关",
    children: [
      { key: "test-form", label: "test-form" },
      { key: "test-select", label: "test-select" },
      { key: "test-modal", label: "test-modal" },
    ],
  },
  {
    key: "table",
    label: "表格相关",
    children: [
      { key: "test-2-table", label: "test-2-table" },
      { key: "test-table", label: "test-table" },
      { key: "test-table-pro", label: "test-table-pro" },
    ],
  },
  {
    key: "other",
    label: "其他",
    children: [
      { key: "test-menu", label: "test-menu" },
      { key: "test-tree", label: "test-tree" },
      { key: "test-collapse", label: "test-collapse" },
      { key: "test-sroll", label: "test-sroll" },
      { key: "test-Switch", label: "test-Switch" },
    ],
  },
];

/**
 * 组件分类布局，左侧 antd Menu 菜单，右侧内容区
 */
const ComponentsLayout: React.FC = () => {
  const location = useLocation();
  const navigate = useNavigate();
  // 当前选中的菜单项
  const selectedKeys = [location.pathname.split("/").pop()!];

  return (
    <div style={{ display: "flex", height: "100%" }}>
      <div style={{ flex: 1, padding: 24, overflow: "auto" }}>
        <Outlet />
      </div>
    </div>
  );
};

export default ComponentsLayout;
