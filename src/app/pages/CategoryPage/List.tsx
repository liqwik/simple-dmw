import React from 'react';
import { QuestionCircleOutlined } from '@ant-design/icons';
import { Table, Button, Popconfirm, Image, Space, Tag } from 'antd';
import { ImageUtil } from 'utils/imageUtil';
import Text from 'antd/lib/typography/Text';

export function CategoryList({
  categories,
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
      dataSource={categories}
      onChange={onPageChange}
      onRow={record => ({
        onClick: () => {
          onSelectRow(record);
        },
      })}
      columns={[
        {
          title: 'Name',
          dataIndex: 'name',
          render: (e, record) => {
            const names = record.name;

            const categoryTags = names.map((name, idx) => (
              <Tag key={idx}>{name}</Tag>
            ));

            return (
              <>
                <Space align="start">
                  <Image
                    width={72}
                    src={ImageUtil.getImageThumbnail(record.imgUrl, 'w_200')}
                  />
                  <div>
                    {categoryTags}
                    <br />
                    <Text strong>{record.name}</Text>
                  </div>
                </Space>
              </>
            );
          },
        },
        {
          title: 'Order',
          dataIndex: 'order',
          key: 'order',
          width: '72px',
          sorter: true,
        },
        {
          title: 'Active',
          dataIndex: 'active',
          key: 'active',
          width: '92px',
          filters: [
            {
              text: 'Active',
              value: 1,
            },
            {
              text: 'Deactive',
              value: 0,
            },
          ],
          filterMultiple: false,
          render: (e, record) => {
            if (record.active) {
              return <Tag color="blue">Active</Tag>;
            }

            return <Tag color="red">Deactive</Tag>;
          },
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
