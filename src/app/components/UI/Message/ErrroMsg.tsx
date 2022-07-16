import React from 'react';
import Text from 'antd/lib/typography/Text';

export const ErrorMsg = ({ children }: any) => {
  return <Text type="danger">{children}</Text>;
};
