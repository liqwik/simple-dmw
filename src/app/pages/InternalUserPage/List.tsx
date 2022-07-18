import React from 'react';
import { Table, Space, Tag } from 'antd';
import Text from 'antd/lib/typography/Text';
import { Link } from 'react-router-dom';
import AppRoute from 'utils/AppRoute';

export function InternalUserList({ items, loading, pagination, onPageChange }) {
  return (
    <Table
      bordered
      rowKey="id"
      size="small"
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        pageSizeOptions: ['20', '50', '100'],
        size: 'default',
        showTotal: total => `Total ${total} items`,
      }}
      dataSource={items}
      onChange={onPageChange}
      columns={[
        {
          title: 'ឈ្មោះ',
          dataIndex: 'id',
          key: 'id',
          render: (e, record) => {
            const { fn, ln } = record;

            return (
              <Space align="center">
                {record.fn && (
                  <>
                    <Text>
                      {fn} {ln}
                    </Text>
                    <br />
                  </>
                )}
              </Space>
            );
          },
        },
        { title: 'គណនី', dataIndex: 'usr', key: 'usr', width: '260px' },
        { title: 'អ៉ីម៉ែល', dataIndex: 'em', key: 'em', width: '260px' },
        {
          title: 'ប្រភេទគណនី',
          dataIndex: 'type',
          key: 'type',
          width: '160px',
          render: (e, record) => <Tag color="#108ee9">{record.userType}</Tag>,
        },
        {
          title: 'Action',
          key: 'action',
          align: 'center',
          width: '96px',
          render: (e, record) => {
            return (
              <div>
                <Space size="middle">
                  <Link type="button" to={`${AppRoute.internalUser}/edit/${record.id}`}>
                    Edit
                  </Link>
                </Space>
              </div>
            );
          },
        },
      ]}
    />
  );
}
