import React from 'react';
import { Card, Col, Row, Space, Typography } from 'antd';

const { Text, Title } = Typography;

export const DashboardCard = ({ title, icon, value, color = 'black' }) => (
  <Card>
    <Row align="top">
      <Col flex="52px">{icon}</Col>
      <Col flex="auto">
        <Space direction="vertical">
          <Text>{title}</Text>
          <Title level={4} style={{ color }}>
            {value}
          </Title>
        </Space>
      </Col>
    </Row>
  </Card>
);
