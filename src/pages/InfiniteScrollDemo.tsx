import React, { useEffect, useState, useRef } from "react";
import { Table } from "antd";
import type { ColumnsType } from "antd/es/table";

/**
 * 用户详细信息接口
 */
interface UserInfo {
  email: string;
  phone: string;
  department: string;
  position: string;
}

/**
 * 用户列表项接口（用于嵌套数组）
 */
interface UserListItem {
  name: string;
  email: string;
}

/**
 * 表格数据类型定义
 */
interface DataType {
  key: number;
  id: number;
  name: string;
  age: number;
  address: string;
  userInfo: UserInfo;
  userList: UserListItem[]; // 新增嵌套数组
}

/**
 * 无限滚动表格组件
 * 通过监听 loading 元素是否出现在视口中来实现自动加载更多数据
 */
const InfiniteScrollDemo: React.FC = () => {
  // 存储所有加载的数据
  const [dataSource, setDataSource] = useState<DataType[]>([]);
  // 当前页码
  const [page, setPage] = useState(1);
  // 是否正在加载
  const [loading, setLoading] = useState(false);
  // 是否还有更多数据
  const [hasMore, setHasMore] = useState(true);
  // loading 元素的引用
  const loadingRef = useRef<HTMLDivElement>(null);
  // 容器的引用
  const containerRef = useRef<HTMLDivElement>(null);

  // 表格列定义
  const columns: ColumnsType<DataType> = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
      width: 80,
    },
    {
      title: "姓名",
      dataIndex: "name",
      key: "name",
      width: 120,
    },
    {
      title: "年龄",
      dataIndex: "age",
      key: "age",
      width: 80,
    },
    {
      title: "地址",
      dataIndex: "address",
      key: "address",
      width: 200,
    },
    {
      title: "邮箱",
      dataIndex: ["userInfo", "email"], // 使用数组形式访问嵌套对象的属性
      key: "email",
      width: 180,
    },
    {
      title: "电话",
      dataIndex: ["userInfo", "phone"],
      key: "phone",
      width: 120,
    },
    {
      title: "部门",
      dataIndex: ["userInfo", "department"],
      key: "department",
      width: 120,
    },
    {
      title: "职位111",
      dataIndex: ["userInfo", "position"],
      key: "position",
      width: 120,
    },
    {
      title: "子用户列表",
      dataIndex: ["userList", "1", "name"],
      key: "userList",
      width: 300,
    },
  ];

  /**
   * 生成模拟数据
   */
  const generateMockData = (startIndex: number, count: number): DataType[] => {
    const departments = ["技术部", "产品部", "市场部", "销售部", "人事部"];
    const positions = ["工程师", "产品经理", "市场专员", "销售经理", "HR专员"];

    return Array.from({ length: count }, (_, i) => {
      const index = startIndex + i;
      const deptIndex = Math.floor(Math.random() * departments.length);
      // 生成嵌套数组 userList
      const userList: UserListItem[] = Array.from({ length: 3 }, (_, j) => ({
        name: `子用户${index}-${j + 1}`,
        email: `subuser${index}_${j + 1}@example.com`,
      }));
      return {
        key: index,
        id: index,
        name: `用户${index}`,
        age: Math.floor(Math.random() * 50) + 20,
        address: `北京市朝阳区某某街道${index}号`,
        userInfo: {
          email: `user${index}@example.com`,
          phone: `1${Math.floor(Math.random() * 1000000000)
            .toString()
            .padStart(10, "0")}`,
          department: departments[deptIndex],
          position: positions[deptIndex],
        },
        userList, // 嵌套数组
      };
    });
  };

  /**
   * 加载更多数据
   */
  const loadMore = () => {
    console.log("loadMore");
    if (loading || !hasMore) return;
    console.log("loadMore 1");
    setLoading(true);
    // 模拟异步加载
    setTimeout(() => {
      const newData = generateMockData((page - 1) * 10 + 1, 10);
      setDataSource(prev => [...prev, ...newData]);
      setPage(prev => prev + 1);
      setLoading(false);

      // 模拟数据加载完毕
      if (page >= 5) {
        setHasMore(false);
      }
    }, 500);
  };

  /**
   * 监听 loading 元素是否出现在视口中
   */
  useEffect(() => {
    console.log("render scroll");
    const observer = new IntersectionObserver(
      entries => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        threshold: 0.1, // 当元素有 10% 进入视口时触发
        root: containerRef.current, // 设置容器为根元素
        rootMargin: "100px", // 可以设置根元素的外边距，影响触发区域
      }
    );

    if (loadingRef.current) {
      observer.observe(loadingRef.current);
    }

    return () => {
      if (loadingRef.current) {
        observer.unobserve(loadingRef.current);
      }
    };
  }, [page, loading, hasMore]);

  // 自定义 Table Row 组件，在最后一行插入 loading 行
  const CustomRow = (props: any) => {
    if (props["data-row-key"] === "loading-row") {
      return (
        <tr>
          <td colSpan={columns.length} style={{ background: "#fff" }}>
            <div ref={loadingRef} style={{ textAlign: "center", padding: 12 }}>
              {loading ? "加载中..." : "加载更多"}
            </div>
          </td>
        </tr>
      );
    }
    return <tr {...props} />;
  };

  // 组装数据，最后加一行"loading"
  const tableData = hasMore ? [...dataSource, { key: "loading-row" }] : dataSource;
  console.log("render");
  return (
    <div style={{ padding: "20px" }}>
      <h1>无限滚动表格示例</h1>
      {/* 表格容器 */}
      <div
        ref={containerRef}
        style={{
          maxWidth: "1200px",
          margin: "0 auto",

          border: "1px solid #e0e0e0",
          borderRadius: "8px",
          padding: "16px",
          boxShadow: "0 2px 8px rgba(0, 0, 0, 0.1)",
        }}
      >
        <Table
          columns={columns}
          dataSource={tableData as any}
          pagination={false}
          scroll={{ y: 800, x: 1000 }}
          loading={false}
          components={{
            body: {
              row: CustomRow,
            },
          }}
        />
        {/* 没有更多数据时，表格外部显示提示 */}
        {!hasMore && <div style={{ textAlign: "center", padding: 12 }}>没有更多数据了</div>}
      </div>
    </div>
  );
};

export default InfiniteScrollDemo;
