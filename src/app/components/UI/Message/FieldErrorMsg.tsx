import React from 'react';
import Text from 'antd/lib/typography/Text';

export const FieldErrorMsg = ({ msg }: any) => {
  return <Text type="danger">{msg}</Text>;
};
