import React, { createContext, useContext, useEffect, useMemo, useState } from "react";

const bizContext = createContext(null);

const Children = () => {
  const bizData = useContext(bizContext);
  console.log(bizData);
  return <div>children</div>;
};
export default function TestContext() {
  const [testData, setTestData] = useState<{ name: string; age: number } | null>(null);
  const getData = async () => {
    const promise = new Promise(resolve => {
      setTimeout(() => {
        console.log("resolve");
        resolve({ name: "chenlong", age: 25 });
      }, 20);
    });
    const data = await promise;
    setTestData(data);
  };

  console.log(testData);
  useEffect(() => {
    getData();
  }, []);

  return (
    <div>
      <Children />
    </div>
  );
}
