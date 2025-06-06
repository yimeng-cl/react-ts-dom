import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";

const TestSelect: React.FC = () => {
  const [value, setValue] = useState<string[]>([]);
  const [count, setCount] = useState<number>(0);

  useEffect(() => {
    console.log(value, count, "value");
  }, [value]);

  return (
    <>
      <Button onClick={() => setCount(count + 1)}>+</Button>
      {count}
      <Select
        // defaultValue={{ value: "lucy", label: "Lucy (101)" }}
        style={{ width: 120 }}
        value={value}
        onChange={v => {
          setValue(v);
        }}
        options={[
          {
            value: "jack",
            label: "Jack (100)",
          },
          {
            value: "lucy",
            label: "Lucy (101)",
          },
        ]}
      />
    </>
  );
};

export default TestSelect;
