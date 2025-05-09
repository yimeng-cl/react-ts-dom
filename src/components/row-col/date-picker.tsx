import React from "react";
import { DatePicker as H2ODatePicker } from "@cffe/h2o-design";
import dayjs from "dayjs";
export default function DatePicker(props) {
  console.log("props-hhh", props);
  return (
    <H2ODatePicker
      showTime
      {...props}
      // value={dayjs(time)}
      // onChange={e => {
      //   debugger;
      //   const newTime = e ? dayjs(e).valueOf() : undefined;
      //   // form.setFieldsValue({ time: newTime });
      // }}
    />
  );
}
