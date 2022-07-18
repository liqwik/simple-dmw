import React from 'react';
import { Form, Input } from 'antd';

export const MyTextInput = ({ label, name, rules, placeholder, type, disabled, ...props }: any) => {
  return (
    <Form.Item label={label} name={name} rules={rules} {...props}>
      <Input type={type || 'text'} placeholder={placeholder} disabled={disabled} />
    </Form.Item>
  );
};
