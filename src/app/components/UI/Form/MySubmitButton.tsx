import React from 'react';
import { Button } from 'antd';

export const MySubmitButton = ({ children, ...props }) => {
  return (
    <Button htmlType="submit" {...props}>
      {children || 'Submit'}
    </Button>
  );
};
