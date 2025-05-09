import { useDeepCompareEffect } from "ahooks";
import { Button } from "antd";
import { useCallback, useEffect, useState } from "react";
import { TestObj } from "./test";

const DEFAULT_VALUE = {};
const { getSetAllDataFn, beforeClose } = TestObj();

const TEST = (props: { value?: { count?: number } }) => {
  const { value = DEFAULT_VALUE } = props;
  const [visible, setVisible] = useState(false);
  const [count, setCount] = useState(0);

  const handleClick = () => {
    getSetAllDataFn();
  };

  useEffect(() => {
    if (visible) {
      const newCount = count;
      setCount(newCount + 1);
      invoke();
    }
  }, [value, visible]);

  const invoke = () => {
    console.log(value);
  };

  return (
    <div>
      <Button type="primary" onClick={handleClick}>
        COUNT + 1
      </Button>
      <Button type="primary" onClick={beforeClose}>
        COUNT
      </Button>
      COUNT == {count}
    </div>
  );
};

export default function index() {
  return <TEST />;
}
