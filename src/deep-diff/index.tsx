import React, { useState } from "react";
import { diff, applyChange, revertChange, Diff } from "deep-diff";

export default function DeepDiff() {
  // 定义旧对象和新对象的状态
  const [oldObj, setOldObj] = useState({ a: 1, b: 2 });
  const [newObj, setNewObj] = useState({ a: 1, b: 3 });
  // 定义差异的状态
  const [diffs, setDiffs] = useState<Diff<any, any>[]>([]);
  // 定义差异队列
  const [diffQueue, setDiffQueue] = useState<Diff<any, any>[]>([]);
  // 定义变更链路
  const [changeHistory, setChangeHistory] = useState<{ a: number; b: number }[]>([]);

  // 比较两个对象的差异
  // diff函数用于比较两个对象之间的差异，返回一个差异数组
  const handleDiff = () => {
    const differences = diff(oldObj, newObj);
    console.log("Differences:", differences); // 输出差异
    setDiffs(differences || []);
    if (differences) {
      setDiffQueue([...diffQueue, ...differences]);
    }
  };

  // 应用差异到旧对象
  // applyChange函数用于将差异应用到目标对象
  const handleApplyChange = () => {
    const differences = diff(oldObj, newObj);
    if (differences) {
      differences.forEach(change => {
        applyChange(oldObj, {}, change);
      });
      console.log("Applied changes to oldObj:", oldObj); // 输出应用变更后的对象
      setOldObj({ ...oldObj });
      setChangeHistory([...changeHistory, { a: oldObj.a, b: oldObj.b }]);
    }
  };

  // 撤销差异到旧对象
  // revertChange函数用于撤销差异，恢复到原始状态
  const handleRevertChange = () => {
    if (diffQueue.length > 0) {
      const lastDiff = diffQueue[diffQueue.length - 1];
      revertChange(oldObj, {}, lastDiff);
      setDiffQueue(diffQueue.slice(0, -1));
      console.log("Reverted changes to oldObj:", oldObj); // 输出撤销变更后的对象
      setOldObj({ ...oldObj });
      setChangeHistory(changeHistory.slice(0, -1));
    }
  };

  // 更新新对象
  const handleUpdateNewObj = (key: string, value: number) => {
    console.log("handleUpdateNewObj", key, value);
    setNewObj({ ...newObj, [key]: value });
  };

  return (
    <div>
      <h2>DeepDiff 演示</h2>
      <div>
        <h3>旧对象:</h3>
        <pre>{JSON.stringify(oldObj, null, 2)}</pre>
      </div>
      <div>
        <h3>新对象:</h3>
        <pre>{JSON.stringify(newObj, null, 2)}</pre>
        <button onClick={() => handleUpdateNewObj("a", oldObj.a + 1)}>更新 a</button>
        <button onClick={() => handleUpdateNewObj("b", oldObj.b + 1)}>更新 b</button>
      </div>
      <button onClick={handleDiff}>比较差异</button>
      <button onClick={handleApplyChange}>应用变更</button>
      <button onClick={handleRevertChange}>撤销变更</button>
      <div>
        <h3>差异:</h3>
        <pre>{JSON.stringify(diffs, null, 2)}</pre>
      </div>
      <div>
        <h3>差异队列:</h3>
        <pre>{JSON.stringify(diffQueue, null, 2)}</pre>
      </div>
      <div>
        <h3>变更链路:</h3>
        <pre>{JSON.stringify(changeHistory, null, 2)}</pre>
      </div>
    </div>
  );
}
