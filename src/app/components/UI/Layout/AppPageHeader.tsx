import React from 'react';
import { PageHeader, Space } from 'antd';
import { AppBreadcrumb } from './AppBreadcrumb';

export function AppPageHeader({ title, subTitle, extra }: any) {
  return (
    <div>
      <div style={{ padding: '16px 16px 0' }}>
        <AppBreadcrumb />
      </div>

      <PageHeader
        ghost={true}
        onBack={() => window.history.back()}
        title={title}
        subTitle={subTitle}
        extra={
          extra && (
            <Space>
              {extra.map((e, idx) => (
                <div key={idx}>{e}</div>
              ))}
            </Space>
          )
        }
      />
    </div>
  );
}
