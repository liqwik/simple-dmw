import React from 'react';
import { Form, Input } from 'antd';

export const MyPasswordInput = ({
  label,
  name,
  rules,
  placeholder,
  onBlur,
  ...props
}: any) => {
  return (
    <Form.Item label={label} name={name} rules={rules} {...props}>
      <Input.Password placeholder={placeholder} onBlur={onBlur} />
    </Form.Item>
  );
};
