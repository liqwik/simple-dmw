import * as React from 'react';
import { Layout } from 'antd';
import {
  AppContent,
  AppHeader,
  AppSidebar,
  AppFooter,
} from 'app/components/UI/Layout';

function MainLayout() {
  return (
    <Layout>
      <Layout>
        <AppSidebar theme="light" />

        <Layout style={{ marginLeft: '220px' }}>
          <AppHeader />

          <AppContent />

          <AppFooter />
        </Layout>
      </Layout>
    </Layout>
  );
}

export default MainLayout;
