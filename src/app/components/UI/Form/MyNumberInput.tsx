import React from 'react';
import { Form, InputNumber } from 'antd';

export const MyNumberInput = ({ ...props }) => {
  return (
    <Form.Item {...props}>
      <InputNumber />
    </Form.Item>
  );
};
