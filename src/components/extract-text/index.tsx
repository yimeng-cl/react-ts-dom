import React, { useEffect, useState } from "react";
import { getJson, mockData, mockIndexMap } from "./utils";

function useCustomHook() {
  const [state, setState] = useState(0);

  useEffect(() => {
    // 在这里执行副作用操作
  }, []);

  return { state, setState };
}

export default class MyComponent extends React.Component {
  customHook = useCustomHook();

  render() {
    const { state, setState } = this.customHook;
    return <div>{state}sadasd</div>;
  }
}
