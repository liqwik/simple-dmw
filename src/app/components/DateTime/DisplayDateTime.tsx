import React from 'react';
import { Space, Typography } from 'antd';
import { ClockCircleOutlined } from '@ant-design/icons';
import DateTimeUtil from 'utils/DateTimeUtil';
const { Text } = Typography;

const DisplayDateTime: React.FC<any> = ({ value }) => {
  return (
    <Space align="center" size={4} style={{ fontSize: '0.7rem' }}>
      <ClockCircleOutlined style={{ color: '#666', display: 'block' }} />
      <Text strong type="secondary">
        {DateTimeUtil.formatDate(value)}
      </Text>
      <div className="circle-badge" />
      <Text strong type="secondary">
        {DateTimeUtil.formatTime(value)}
      </Text>
    </Space>
  );
};

export default DisplayDateTime;
