import { Button, Select } from "antd";
import React, { useEffect, useState } from "react";

let arr: (number | { name: string; age: number })[] = [];
let flag: boolean = true;

if (flag) {
  arr = [1, 2, 3, 4, 5];
} else {
  arr.push({ name: "chenlong", age: 25 });
}

const TestSelect: React.FC = () => {
  const [value, setValue] = useState([0]);

  useEffect(() => {
    for (let index = 0; index < 3; index++) {
      setValue([...value, index]);
    }
  });

  useEffect(() => {
    console.log(value);
  }, [value]);

  return (
    <>
      <Select
        defaultValue='lucy'
        // defaultValue={{ value: "lucy", label: "Lucy (101)" }}
        style={{ width: 120 }}
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
