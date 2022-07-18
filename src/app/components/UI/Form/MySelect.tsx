import React from 'react';
import { Form, Select } from 'antd';

export const MySelect = ({ label, name, children, placeholder, onChange, ...props }: any) => {
  return (
    <Form.Item label={label} name={name} {...props}>
      <Select placeholder={placeholder} onChange={onChange}>
        {children}
      </Select>
    </Form.Item>
  );
};

MySelect.Option = Select.Option;
MySelect.OptGroup = Select.OptGroup;
