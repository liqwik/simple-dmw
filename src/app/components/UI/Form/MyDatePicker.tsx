import React from 'react';
import { DatePicker, Form } from 'antd';
import PropTypes from 'prop-types';

export const MyDatePicker = ({ label, name, rules, placeholder, ...props }: any) => {
  return (
    <Form.Item label={label} name={name} rules={rules} {...props}>
      <DatePicker />
    </Form.Item>
  );
};

MyDatePicker.propTypes = {
  label: PropTypes.string.isRequired,
  name: PropTypes.string.isRequired,
  rules: PropTypes.array,
  placeholder: PropTypes.string,
};
