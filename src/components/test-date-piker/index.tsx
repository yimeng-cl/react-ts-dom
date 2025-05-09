import { DatePicker } from "@cffe/h2o-design";
import React, { useState } from "react";

export default function TestDatePiker() {
  const [selectedTypesValue, setSelectedTypesValue] = useState<string>([][0]);
  return (
    <div>
      时间选择器：
      <DatePicker.RangePicker
        format='YYYY-MM-DD HH:mm'
        allowClear={false}
        showTime
        onChange={(date, dateString) => {
          console.log(date, dateString);
        }}
      />
    </div>
  );
}
