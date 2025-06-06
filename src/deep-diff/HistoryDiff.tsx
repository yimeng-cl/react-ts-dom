import React, { useState, useEffect } from "react";
import { diff, Diff, applyChange, revertChange } from "deep-diff";
import { Button, Space } from "antd";

// 定义对象类型
interface User {
  name: string;
  age: number;
  address: {
    city: string;
    street: string;
    details: {
      building: string;
      room: number;
    };
  };
  hobbies: string[];
}

export default function HistoryDiff() {
  // 初始对象
  const initialObj: User = {
    name: "张三",
    age: 25,
    address: {
      city: "北京",
      street: "朝阳路",
      details: {
        building: "A栋",
        room: 101,
      },
    },
    hobbies: ["读书", "运动"],
  };

  // 当前对象状态
  const [currentObj, setCurrentObj] = useState<User>(initialObj);
  // 历史记录数组，只存储差异
  const [history, setHistory] = useState<Diff<any, any>[][]>([]);
  // 当前历史记录索引
  const [currentIndex, setCurrentIndex] = useState(-1);

  /**
   * 初始化历史记录
   * 在组件挂载时，将初始状态（空差异数组）添加到历史记录中
   */
  useEffect(() => {
    setHistory([[]]); // 初始状态没有差异
    setCurrentIndex(0);
  }, []);

  /**
   * 更新对象并记录历史
   * @param newObj - 新的对象状态
   *
   * 功能说明：
   * 1. 计算新旧对象的差异
   * 2. 如果存在差异，则更新历史记录和当前对象
   * 3. 如果当前不在历史记录末尾，会删除当前位置之后的记录
   */
  const updateObjectWithHistory = (newObj: User) => {
    const differences = diff(currentObj, newObj);

    if (differences) {
      // 如果当前不在历史记录末尾，需要删除当前位置之后的记录
      const newHistory = history.slice(0, currentIndex + 1);
      newHistory.push(differences);
      setHistory(newHistory);
      setCurrentObj(newObj);
      setCurrentIndex(newHistory.length - 1);
    }
  };

  /**
   * 更新对象并记录差异
   * @param updates - 要更新的对象属性
   */
  const handleUpdate = (updates: Partial<User>) => {
    const newObj = { ...currentObj, ...updates };
    updateObjectWithHistory(newObj);
  };

  /**
   * 更新地址信息
   *
   * 功能说明：
   * 1. 切换城市（北京/上海）
   * 2. 增加房间号
   * 3. 记录变更到历史记录
   */
  const handleUpdateAddress = () => {
    const newObj = {
      ...currentObj,
      address: {
        ...currentObj.address,
        city: currentObj.address.city === "北京" ? "上海" : "北京",
        details: {
          ...currentObj.address.details,
          room: currentObj.address.details.room + 1,
        },
      },
    };
    updateObjectWithHistory(newObj);
  };

  /**
   * 更新爱好
   *
   * 功能说明：
   * 1. 如果爱好数量达到3个，则删除最后一个
   * 2. 如果爱好数量小于3个，则添加新爱好
   * 3. 记录变更到历史记录
   */
  const handleUpdateHobbies = () => {
    const newHobbies = [...currentObj.hobbies];
    if (newHobbies.length >= 3) {
      newHobbies.pop();
    } else {
      newHobbies.push("新爱好" + (newHobbies.length + 1));
    }

    const newObj = {
      ...currentObj,
      hobbies: newHobbies,
    };
    updateObjectWithHistory(newObj);
  };

  /**
   * 回退到上一个状态
   *
   * 功能说明：
   * 1. 检查是否可以回退（currentIndex > 0）
   * 2. 获取当前状态的差异
   * 3. 使用 revertChange 撤销每个差异
   * 4. 更新当前对象和索引
   */
  const handleUndo = () => {
    if (currentIndex > 0) {
      const newIndex = currentIndex - 1;
      // 获取当前差异
      const currentDiff = history[currentIndex];
      // 创建新对象用于回退
      const newObj = { ...currentObj };
      // 对每个差异执行回退操作
      currentDiff.forEach(change => {
        revertChange(newObj, {}, change);
      });
      setCurrentObj(newObj);
      setCurrentIndex(newIndex);
    }
  };

  /**
   * 前进到下一个状态
   *
   * 功能说明：
   * 1. 检查是否可以前进（currentIndex < history.length - 1）
   * 2. 获取下一个状态的差异
   * 3. 使用 applyChange 应用每个差异
   * 4. 更新当前对象和索引
   */
  const handleRedo = () => {
    if (currentIndex < history.length - 1) {
      const newIndex = currentIndex + 1;
      // 获取下一个状态的差异
      const nextDiff = history[newIndex];
      // 创建新对象用于应用变更
      const newObj = { ...currentObj };
      // 对每个差异执行应用操作
      nextDiff.forEach(change => {
        applyChange(newObj, {}, change);
      });
      setCurrentObj(newObj);
      setCurrentIndex(newIndex);
    }
  };

  /**
   * 重置所有状态到初始值
   *
   * 功能说明：
   * 1. 重置当前对象为初始状态
   * 2. 清空历史记录，只保留初始状态
   * 3. 重置索引为0
   */
  const handleRefresh = () => {
    setCurrentObj(initialObj);
    setHistory([[]]); // 重置为空差异数组
    setCurrentIndex(0);
  };

  /**
   * 根据当前对象和差异计算历史记录中的对象状态
   * @param index - 要计算的历史记录索引
   * @returns 计算得到的历史状态对象
   *
   * 功能说明：
   * 1. 如果是初始状态（index = 0），直接返回初始对象
   * 2. 否则，从初始状态开始，依次应用所有差异
   * 3. 返回计算得到的历史状态
   */
  const getHistoryObject = (index: number): User => {
    if (index === 0) return initialObj;

    const obj = { ...initialObj };
    // 应用从初始状态到目标状态的所有差异
    for (let i = 1; i <= index; i++) {
      history[i].forEach(change => {
        applyChange(obj, {}, change);
      });
    }
    return obj;
  };

  return (
    <div style={{ padding: "20px" }}>
      {/* 操作按钮区域 */}
      <div style={{ marginBottom: "20px" }}>
        <Space>
          <Button
            type='primary'
            onClick={() =>
              handleUpdate({
                name: currentObj.name === "张三" ? "李四" : "张三",
                age: currentObj.age + 1,
              })
            }
          >
            更新基本信息
          </Button>
          <Button type='primary' onClick={handleUpdateAddress}>
            更新地址信息
          </Button>
          <Button type='primary' onClick={handleUpdateHobbies}>
            更新爱好
          </Button>
          <Button onClick={handleUndo} disabled={currentIndex <= 0}>
            回退
          </Button>
          <Button onClick={handleRedo} disabled={currentIndex >= history.length - 1}>
            前进
          </Button>
          <Button type='primary' danger onClick={handleRefresh}>
            刷新
          </Button>
        </Space>
      </div>

      {/* 当前对象显示 */}
      <div style={{ marginBottom: "20px" }}>
        <h3>当前对象：</h3>
        <div>{JSON.stringify(currentObj, null, 2)}</div>
      </div>

      {/* 历史记录显示 */}
      <div style={{ marginBottom: "20px" }}>
        <h3>历史记录：</h3>
        {history.map((_, index) => (
          <div
            key={index}
            style={{
              padding: "5px",
              backgroundColor: index === currentIndex ? "#e6f7ff" : "transparent",
            }}
          >
            {JSON.stringify(getHistoryObject(index), null, 2)}
          </div>
        ))}
      </div>

      {/* 差异记录显示 */}
      <div>
        <h3>差异记录：</h3>
        {history.map((item, index) => (
          <div
            key={index}
            style={{
              padding: "5px",
              backgroundColor: index === currentIndex ? "#e6f7ff" : "transparent",
            }}
          >
            {JSON.stringify(item, null, 2)}
          </div>
        ))}
      </div>
    </div>
  );
}
