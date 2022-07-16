import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Table, Button, Popconfirm } from 'antd';

export function InstitutionList({
  items,
  loading,
  pagination,
  onPageChange,
  onSelectRow,
  onRemove,
}) {
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
          title: 'ឈ្មោះអង្គភាព/ស្ថាប័ន',
          dataIndex: 'name',
        },
        {
          title: 'ព័ត៌មានបន្តែម',
          dataIndex: 'description',
        },
        {
          title: 'Action',
          width: '160px',
          align: 'center',
          render: (e, record) => (
            <span>
              <Button
                type="link"
                onClick={e => {
                  onSelectRow(record);
                }}
              >
                Edit
              </Button>
              <Popconfirm
                title="Are you sure？"
                icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                onConfirm={e => {
                  e?.stopPropagation();
                  onRemove(record.id);
                }}
              >
                <Button
                  type="link"
                  style={{ color: '#f5222d' }}
                  onClick={e => {
                    e.stopPropagation();
                  }}
                >
                  Delete
                </Button>
              </Popconfirm>
            </span>
          ),
        },
      ]}
    />
  );
}
