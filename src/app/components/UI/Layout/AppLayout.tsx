import React from 'react';
import { Layout } from 'antd';

export function AppLayout({ children, ...props }) {
  return (
    <Layout.Content
      style={{
        margin: '16px',
        padding: '8px',
        background: '#fff',
      }}
      {...props}
    >
      {children}
    </Layout.Content>
  );
}
