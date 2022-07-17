import React from 'react';
import { Layout, Row, Space } from 'antd';
import { HeaderAvatar } from 'app/components/UI/GlobalHeader/HeaderAvatar';
import SwitchLanguage from 'app/features/SwitchLanguage/SwitchLanguage';

const { Header } = Layout;

export function AppHeader() {
  return (
    <Header
      style={{
        background: '#fff',
        zIndex: 1,
        width: '100%',
        boxShadow: '0 1px 3px rgba(0,0,0,0.05)',
        padding: '0 24px',
      }}
    >
      <Row justify="end">
        <Space size="large">
          <SwitchLanguage />
          <HeaderAvatar />
        </Space>
      </Row>
    </Header>
  );
}
