import React from 'react';
import { Table, Button } from 'antd';

export function UserList({
  items,
  loading,
  pagination,
  onPageChange,
  onSelectRow,
}: any) {
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
      onRow={record => ({
        onClick: () => {
          onSelectRow(record);
        },
      })}
      columns={[
        {
          title: 'នាមត្រកូល',
          dataIndex: 'fn',
          key: 'fn',
        },
        {
          title: 'នាម',
          dataIndex: 'ln',
          key: 'ln',
        },
        { title: 'លេខទូរស័ព្ទ', dataIndex: 'ph', key: 'ph', width: '160px' },
        {
          title: 'ភេទ',
          dataIndex: 'sex',
          key: 'sex',
          width: '72px',
          align: 'center',
          render: (e, record) => {
            const gender = { m: 'ប្រុស', f: 'ស្រី' };

            return gender[record.sex];
          },
        },
        {
          title: 'ប្រភេទមន្ត្រី',
          dataIndex: 'userType',
          key: 'userType',
          width: '96px',
          align: 'center',
          render: (e, record) => {
            const userType = { assistant: 'ក្រុមជំនួយការ', other: 'ផ្សេងៗ' };

            return userType[record.userType];
          },
        },
        {
          title: 'Action',
          key: 'action',
          align: 'center',
          width: '96px',
          render: (e, record) => {
            return (
              <div>
                <Button
                  type="link"
                  onClick={e => {
                    onSelectRow(record);
                  }}
                >
                  កែប្រែ
                </Button>
              </div>
            );
          },
        },
      ]}
    />
  );
}
