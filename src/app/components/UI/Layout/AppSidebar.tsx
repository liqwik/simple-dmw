import React from 'react';
import { Layout } from 'antd';
import SideBarMenuData from 'app/SideBarMenuData';
import { Logo } from 'app/components/UI/Icon';

const { Sider } = Layout;

export function AppSidebar({ theme }) {
  return (
    <Sider
      theme={theme}
      width={220}
      style={{
        height: '100vh',
        position: 'fixed',
        left: 0,
        top: 0,
        paddingTop: '16px',
      }}
    >
      <Logo margin="0 auto 16px" width="48px" />
      <SideBarMenuData theme={theme} />
    </Sider>
  );
}
