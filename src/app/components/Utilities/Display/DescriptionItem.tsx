import React, { ReactNode } from 'react';
import { Space, Typography } from 'antd';
import { MinusOutlined } from '@ant-design/icons';

interface DescriptionItemProps {
  title: string;
  content: string | ReactNode;
  [props: string]: any;
}

const { Text } = Typography;

const DescriptionItem = ({ title, content, ...props }: DescriptionItemProps) => {
  return (
    <Space direction="vertical" size={0} {...props}>
      <Text strong style={{ fontSize: '0.95rem' }}>
        {title}
      </Text>
      {content ? <Text style={{ fontSize: '0.95rem', color: '#333' }}>{content}</Text> : <MinusOutlined />}
    </Space>
  );
};

export default DescriptionItem;
