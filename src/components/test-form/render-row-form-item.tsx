import React from "react";
import { Col, Form, Input, Row } from "antd";

export default function RenderRowFormItem() {
  return (
    <Row>
      <Col span={12}>
        <Form.Item name='name' label='Name'>
          <Input />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item name='age' label='Age'>
          <Input />
        </Form.Item>
      </Col>
    </Row>
  );
}

// let statisticsTime = [dayjs(), dayjs()];
// let syncTime = dayjs().startOf("m").subtract(24, "hours");
// // 入院后 入院后尿量统计
// if (AFTER_IN_HOSPITAL_TYPE_ARR.includes(selectedTypes.value)) {
//   if (hospitalizedDate) {
//     statisticsTime = [dayjs(hospitalizedDate).startOf("m"), dayjs()];
//   }
//   // 自定义
// } else if (selectedTypes.timeType === "range") {
//   if (selectedTypes?.value === DAYTIME_STATISTICS) {
//     statisticsTime = [
//       dayjs().hour(selectedTypes?.startTime).startOf("h"),
//       dayjs().hour(selectedTypes?.endTime).startOf("h"),
//     ];
//     syncTime = dayjs().startOf("m");
//   } else {
//     statisticsTime = [dayjs().startOf("m").subtract(24, "hours"), dayjs().startOf("m")];
//   }
//   // 24小时 24小时尿量统计
// } else if (HOUR_TYPE_ARR.includes(selectedTypes.value)) {
//   statisticsTime = [dayjs(towForInitTime).subtract(24, "hours"), towForInitTime];
//   if (selectedTypes.value === "oneTwoHours") {
//     statisticsTime = [dayjs(dayjs().hour(6).startOf("h")), dayjs(dayjs().hour(18).startOf("h"))];
//   }
//   syncTime = dayjs().subtract(formHours, "hours");
// } else if (
//   selectedTypes.value === "postOperation" ||
//   selectedTypes.value === "postOperationUrine"
// ) {
//   // 术后 术后尿量统计
//   statisticsTime = [dayjs().startOf("m"), dayjs().startOf("m")];
// }
