import React from 'react';
import { Layout } from 'antd';
import { AppPageHeader } from './AppPageHeader';
import { MyWrapper } from 'app/pages/App/MyWrapper';

export function AppLayoutWithHeader({ padding, bg, children, ...props }) {
  return (
    <MyWrapper>
      <AppPageHeader {...props} />

      <Layout.Content
        style={{
          margin: '0 16px 16px',
          padding: padding || '16px',
          background: bg || '#fff',
        }}
      >
        {children}
      </Layout.Content>
    </MyWrapper>
  );
}
