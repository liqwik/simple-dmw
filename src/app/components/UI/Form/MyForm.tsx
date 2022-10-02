import React from 'react';
import PropTypes from 'prop-types';
import { Form } from 'antd';

type IMyFormProps = {
  initialValues: any;
  onFinish: any;
  onFinishFailed: any;
  ref: any;
  children: any;
};

export const MyForm = ({ initialValues, children, onFinish, onFinishFailed, ...props }: IMyFormProps) => {
  const handleFinishFailed = info => {
    alert(JSON.stringify(info));
    if (onFinishFailed) {
      onFinishFailed(info);
    }
  };

  return (
    <Form initialValues={initialValues} onFinish={onFinish} onFinishFailed={handleFinishFailed} {...props}>
      {children}
    </Form>
  );
};

MyForm.propTypes = {
  children: PropTypes.any.isRequired,
  onFinish: PropTypes.func.isRequired,
  onFinishFailed: PropTypes.func,
  initialValues: PropTypes.object,
};
