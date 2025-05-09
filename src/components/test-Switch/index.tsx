import { Switch } from "antd";
import React, { useState } from "react";

const data = [1, 2, 3, 4, 5];
data.forEach(e => {
  if (e === 3) {
    return;
  }
  console.log(e);
});

export default function TestSwitch() {
  const [logicType, setLogicType] = useState(false);
  console.log(logicType, "logicType");

  return (
    <Switch
      onChange={checked => {
        setLogicType(checked);
      }}
      checkedChildren='&&'
      unCheckedChildren='||'
      checked={logicType}
    />
  );
}
