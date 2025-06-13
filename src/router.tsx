import { Outlet, RouteObject } from "react-router-dom";
import { lazy, Suspense } from "react";
import ComponentsLayout from "./components/ComponentsLayout";

const Components = lazy(() => import("./components"));
const DeepDiff = lazy(() => import("./deep-diff"));
const HistoryDiff = lazy(() => import("./deep-diff/HistoryDiff"));
const JsonDiffDemo = lazy(() => import("./pages/JsonDiffDemo"));
const DecoratorDemo = lazy(() => import("./pages/DecoratorDemo"));
const PrintDemo = lazy(() => import("./pages/PrintDemo"));
const InfiniteScrollDemo = lazy(() => import("./pages/InfiniteScrollDemo"));
const SolarTermsCalculator = lazy(() => import("./pages/SolarTermsCalculator"));

// 自动批量引入 components 下所有子组件
const ComponentsTest = lazy(() => import("./components/test"));
const ComponentsRowCol = lazy(() => import("./components/row-col"));
const ComponentsFlexBox = lazy(() => import("./components/flex-box"));
const ComponentsTestDate = lazy(() => import("./components/test-date"));
const ComponentsTestForm = lazy(() => import("./components/test-form"));
const ComponentsTestLess = lazy(() => import("./components/test-less"));
const ComponentsTestMenu = lazy(() => import("./components/test-menu"));
const ComponentsTestTree = lazy(() => import("./components/test-tree"));
const ComponentsTestCollapse = lazy(() => import("./components/test-collapse"));
const ComponentsTestSroll = lazy(() => import("./components/test-sroll"));
const ComponentsTestSwitch = lazy(() => import("./components/test-Switch"));
const ComponentsTestSelect = lazy(() => import("./components/test-select"));
const ComponentsTestModal = lazy(() => import("./components/test-modal"));
const ComponentsTest2Table = lazy(() => import("./components/test-2-table"));
const ComponentsTestTable = lazy(() => import("./components/test-table"));
const ComponentsTestTablePro = lazy(() => import("./components/test-table-pro"));
const ComponentsMonacoEditor = lazy(() => import("./components/monaco-editor"));
const ComponentsSnakeGame = lazy(() => import("./components/snake-game"));
const ComponentsExtractText = lazy(() => import("./components/extract-text"));
const ComponentsSolarTerms = lazy(() => import("./components/solar-terms"));
const ComponentsCssStyleTest = lazy(() => import("./components/css-style-test"));
const AsyncValidatorTest = lazy(() => import("./components/async-validator-test"));

const routes: RouteObject[] = [
  {
    path: "/components",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <Outlet />
      </Suspense>
    ),
    children: [
      {
        path: "test",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsTest />
          </Suspense>
        ),
      },
      {
        path: "row-col",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsRowCol />
          </Suspense>
        ),
      },
      {
        path: "flex-box",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsFlexBox />
          </Suspense>
        ),
      },
      {
        path: "test-date",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsTestDate />
          </Suspense>
        ),
      },
      {
        path: "test-form",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsTestForm />
          </Suspense>
        ),
      },
      {
        path: "test-less",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsTestLess />
          </Suspense>
        ),
      },
      {
        path: "test-menu",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsTestMenu />
          </Suspense>
        ),
      },
      {
        path: "test-tree",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsTestTree />
          </Suspense>
        ),
      },
      {
        path: "test-collapse",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsTestCollapse />
          </Suspense>
        ),
      },
      {
        path: "test-sroll",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsTestSroll />
          </Suspense>
        ),
      },
      {
        path: "test-Switch",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsTestSwitch />
          </Suspense>
        ),
      },
      {
        path: "test-select",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsTestSelect />
          </Suspense>
        ),
      },
      {
        path: "test-modal",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsTestModal />
          </Suspense>
        ),
      },
      {
        path: "test-2-table",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsTest2Table />
          </Suspense>
        ),
      },
      {
        path: "test-table",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsTestTable />
          </Suspense>
        ),
      },
      {
        path: "test-table-pro",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsTestTablePro />
          </Suspense>
        ),
      },
      {
        path: "monaco-editor",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsMonacoEditor />
          </Suspense>
        ),
      },
      {
        path: "snake-game",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsSnakeGame />
          </Suspense>
        ),
      },
      {
        path: "extract-text",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsExtractText />
          </Suspense>
        ),
      },
      {
        path: "solar-terms",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsSolarTerms />
          </Suspense>
        ),
      },
      {
        path: "css-style-test",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <ComponentsCssStyleTest />
          </Suspense>
        ),
      },
      {
        path: "async-validator-test",
        element: (
          <Suspense fallback={<div>Loading...</div>}>
            <AsyncValidatorTest />
          </Suspense>
        ),
      },
    ],
  },
  {
    path: "/deep-diff",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <DeepDiff />
      </Suspense>
    ),
  },
  {
    path: "/history-diff",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <HistoryDiff />
      </Suspense>
    ),
  },
  {
    path: "/json-diff",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <JsonDiffDemo />
      </Suspense>
    ),
  },
  {
    path: "/decorator-demo",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <DecoratorDemo />
      </Suspense>
    ),
  },
  {
    path: "/print-demo",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <PrintDemo />
      </Suspense>
    ),
  },
  {
    path: "/infinite-scroll",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <InfiniteScrollDemo />
      </Suspense>
    ),
  },
  {
    path: "/节气计算器",
    element: (
      <Suspense fallback={<div>Loading...</div>}>
        <SolarTermsCalculator />
      </Suspense>
    ),
  },
];

export default routes;
