import React from "react";
import { Layout, Menu, ConfigProvider } from "antd";
import { useNavigate, useLocation, useRoutes } from "react-router-dom";
import zhCN from "antd/lib/locale/zh_CN";
import moment from "moment";
import "moment/locale/zh-cn";
import routes from "./router";
import type { MenuProps } from "antd";
import type { RouteObject } from "react-router-dom";

const { Header, Content } = Layout;

// 设置moment.js为中文
moment.locale("zh-cn");

// 路由中英文名称映射表
const routeNameMap: Record<string, { zh: string; en: string }> = {
  // 主要路由
  components: { zh: "组件展示", en: "components" },
  "deep-diff": { zh: "深度对比", en: "deep-diff" },
  "history-diff": { zh: "历史对比", en: "history-diff" },
  "json-diff": { zh: "JSON对比", en: "json-diff" },
  "decorator-demo": { zh: "装饰器演示", en: "decorator-demo" },
  "print-demo": { zh: "打印演示", en: "print-demo" },
  "infinite-scroll": { zh: "无限滚动", en: "infinite-scroll" },

  // 组件子路由
  test: { zh: "测试组件", en: "test" },
  "row-col": { zh: "行列布局", en: "row-col" },
  "flex-box": { zh: "弹性布局", en: "flex-box" },
  "test-date": { zh: "日期测试", en: "test-date" },
  "test-form": { zh: "表单测试", en: "test-form" },
  "test-less": { zh: "样式测试", en: "test-less" },
  "test-menu": { zh: "菜单测试", en: "test-menu" },
  "test-tree": { zh: "树形测试", en: "test-tree" },
  "test-collapse": { zh: "折叠测试", en: "test-collapse" },
  "test-sroll": { zh: "滚动测试", en: "test-sroll" },
  "test-Switch": { zh: "开关测试", en: "test-Switch" },
  "test-select": { zh: "选择测试", en: "test-select" },
  "test-modal": { zh: "弹窗测试", en: "test-modal" },
  "test-2-table": { zh: "表格测试2", en: "test-2-table" },
  "test-table": { zh: "表格测试", en: "test-table" },
  "test-table-pro": { zh: "高级表格", en: "test-table-pro" },
  "monaco-editor": { zh: "代码编辑器", en: "monaco-editor" },
  "snake-game": { zh: "贪吃蛇游戏", en: "snake-game" },
  "extract-text": { zh: "文本提取", en: "extract-text" },
  "solar-terms": { zh: "二十四节气", en: "solar-terms" },
};

/**
 * 获取路由显示名称
 * @param path - 路由路径
 * @returns 包含中英文的显示名称
 */
function getRouteDisplayName(path: string) {
  const routeKey = path.replace(/^\//, "");
  const nameInfo = routeNameMap[routeKey];

  if (nameInfo) {
    return (
      <div
        style={{
          textAlign: "center",
          lineHeight: "1.2",
          padding: "4px 0",
        }}
      >
        <div
          style={{
            fontSize: "13px",
            fontWeight: 500,
            color: "#262626",
          }}
        >
          {nameInfo.zh}
        </div>
        <div
          style={{
            fontSize: "11px",
            color: "#8c8c8c",
            marginTop: "1px",
            opacity: 0.8,
          }}
        >
          {nameInfo.en}
        </div>
      </div>
    );
  }

  // 如果没有映射，返回原始路径
  return routeKey;
}

// 根据路由自动生成菜单项
function generateMenuItems(routes: RouteObject[], parentPath = ""): MenuProps["items"] {
  return routes
    .filter(route => route.path && route.path !== "*" && route.path !== undefined)
    .map(route => {
      // 取 label，优先 route.label，否则用 path
      const originalLabel = (route as any).label || route.path!.replace(/^\//, "");
      const displayLabel = getRouteDisplayName(route.path!);

      // 拼接完整路径
      const fullPath = route.path!.startsWith("/") ? route.path! : parentPath ? `${parentPath}/${route.path}` : `/${route.path}`;

      if (route.children && route.children.length > 0) {
        return {
          key: fullPath,
          label: displayLabel,
          children: generateMenuItems(route.children, fullPath),
        };
      }
      return {
        key: fullPath,
        label: displayLabel,
      };
    });
}

const menuItems = generateMenuItems(routes);

/**
 * 应用主布局，顶部 antd Menu 横向多级菜单，内容区渲染 useRoutes
 */
const App: React.FC = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const element = useRoutes(routes);

  // 选中项，优先选中子菜单，否则选中一级菜单
  const selectedKeys = React.useMemo(() => {
    const path = location.pathname;
    // 递归查找选中项
    function findSelected(items: Exclude<MenuProps["items"], undefined>): string[] {
      for (const item of items) {
        if (!item) continue;
        if ((item as any).key === path) return [(item as any).key];
        if ((item as any).children) {
          const found = findSelected((item as any).children);
          if (found.length) return found;
        }
      }
      return [];
    }
    return findSelected(menuItems as Exclude<MenuProps["items"], undefined>);
  }, [location.pathname]);

  return (
    <ConfigProvider locale={zhCN}>
      <Layout style={{ minHeight: "100vh" }}>
        <Header
          style={{
            height: "auto",
            minHeight: "64px",
            padding: "0 24px",
            backgroundColor: "transparent",
            boxShadow: "0 1px 4px rgba(0,21,41,.08)",
          }}
        >
          <Menu
            theme='light'
            mode='horizontal'
            selectedKeys={selectedKeys}
            items={menuItems}
            onClick={({ key }) => navigate(key)}
            style={{
              lineHeight: "64px",
              borderBottom: "none",
              backgroundColor: "transparent",
            }}
            // 自定义菜单项样式
            className='custom-menu'
          />
        </Header>
        <Content style={{ padding: 24 }}>{element}</Content>
      </Layout>
    </ConfigProvider>
  );
};

export default App;
