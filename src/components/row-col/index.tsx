import { Button, Col, DatePicker, Form, Input, Row, Select } from "@cffe/h2o-design";
import React, { useEffect } from "react";
// import DatePicker from "./date-picker";
import "./index.less";
import dayjs from "dayjs";

const { Item } = Form;

export default function RowCol() {
  const [form] = Form.useForm();

  const onSubmit = () => {
    form.validateFields();
    const values = form.getFieldsValue();
    console.log(values);
  };
  return (
    <>
      <Form layout="inline" className="form-box " form={form}>
        <Row gutter={[0, 5]} wrap className=" row-box">
          <Item
            label="测试123"
            name="test"
            rules={[
              {
                required: true,
              },
            ]}
          >
            <Select
              placeholder="请输入"
              options={[
                { label: "测试1", value: "1" },
                { label: "测试2", value: "2" },
                { label: "测试3", value: "3" },
              ]}
              onSelect={(value, options) => {
                console.log(value, options);
              }}
            />
          </Item>
        </Row>
        <Item label="测试时间" name="time" initialValue="2024-07-12 15:18">
          <DatePicker showTime format="YYYY-MM-DD HH:mm:ss" valueFormat="YYYY-MM-DD HH:mm:ss" />
        </Item>
      </Form>
      <Button type="primary" onClick={onSubmit}>
        提交
      </Button>
    </>
  );
}
