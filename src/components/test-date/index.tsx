import { DatePicker } from "antd";
import React, { useState } from "react";
import dayjs from "dayjs";
const { RangePicker } = DatePicker;

export default function TestDate() {
  const [rangeTime, setRangeTime] = useState([]);
  return (
    <RangePicker
      allowClear={false}
      showTime
      defaultValue={[dayjs(), dayjs()]}
      value={rangeTime}
      onChange={dates => {
        console.log(dates);
        // @ts-ignore dayjs 和 moment 类型冲突
        setRangeTime(dates);
      }}
    />
  );
}
