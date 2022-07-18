import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Table, Button, Popconfirm } from 'antd';

export function DocTypeList({ categories, loading, pagination, onPageChange, onSelectRow, onRemove }) {
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
      dataSource={categories}
      onChange={onPageChange}
      onRow={record => ({
        onClick: () => {
          onSelectRow(record);
        },
      })}
      columns={[
        {
          title: 'ឈ្មោះប្រភេទឯកសារ',
          dataIndex: 'name',
        },
        {
          title: 'លេខកូដ',
          dataIndex: 'code',
        },
        // {
        //   title: 'Active',
        //   dataIndex: 'isActive',
        //   key: 'isActive',
        //   width: '92px',
        //   filters: [
        //     {
        //       text: 'Active',
        //       value: 1,
        //     },
        //     {
        //       text: 'Deactive',
        //       value: 0,
        //     },
        //   ],
        //   filterMultiple: false,
        //   render: (e, record) => {
        //     if (record.active) {
        //       return <Tag color="blue">Active</Tag>;
        //     }

        //     return <Tag color="red">Deactive</Tag>;
        //   },
        // },
        {
          title: 'Action',
          width: '160px',
          align: 'center',
          render: (_e, record) => (
            <span>
              <Button
                type="link"
                onClick={_e => {
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
