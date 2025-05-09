import React, { useState } from "react";
import { Button, Form, Input } from "@cffe/h2o-design";
import "./index.less";
import { useForm } from "antd/lib/form/Form";

const { TextArea } = Input;
export default function CustomRemark() {
  const onFinish = (values: any) => {
    console.log("Success:", values);
  };

  return (
    <div>
      <Form onFinish={onFinish}>
        <Form.Item name='remark' label='备注'>
          <TextArea placeholder='请输入备注' />
        </Form.Item>
        <Form.Item name='style' label='样式'>
          <Form.Item name='color' label='颜色'>
            <input type='color' />
          </Form.Item>
        </Form.Item>
        <Form.Item>
          <Button type='primary' htmlType='submit'>
            Submit
          </Button>
        </Form.Item>
      </Form>

      <div>
        输入值：
        <div className='custom-remark'></div>
      </div>
    </div>
  );
}
