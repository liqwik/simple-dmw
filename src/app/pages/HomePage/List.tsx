import React from 'react';
import { Table, Button, Space } from 'antd';
import DateTimeUtil from 'utils/DateTimeUtil';
import Text from 'antd/lib/typography/Text';
import { DOC_STATUS_LABEL } from 'utils/constants';
import { useTranslation } from 'react-i18next';

function HomeList({ items, loading, pagination, onViewDetail, onPageChange }: any) {
  const { t } = useTranslation();

  return (
    <Table
      bordered
      rowKey="id"
      size="small"
      rowClassName={(record, idx) => {
        if (record.docStatus === 'normal') {
          return 'doc-row-normal';
        }
        if (record.docStatus === 'signature') {
          return 'doc-row-signature';
        }
        if (record.docStatus === 'urgent') {
          return 'doc-row-urgent';
        }
        return '';
      }}
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
          title: <Text strong>ល.រ</Text>,
          align: 'center',
          width: '64px',
          render: (e, record, idx) => {
            const { current, pageSize } = pagination;
            const numRange = current * pageSize;
            const num = numRange - (numRange / current - (idx + 1));
            return <Text>{num}</Text>;
          },
        },
        {
          title: <Text strong>ព័ត៌មានឯកសារ</Text>,
          align: 'center',
          children: [
            {
              title: <Text strong>អង្គភាព/ស្ថាប័ន</Text>,
              dataIndex: 'institutionId',
              key: 'id',
              render: (e, record) => {
                const { institutionId } = record;
                return (
                  <div>
                    <Text>{institutionId && institutionId.name}</Text>
                    <br />
                    <Text type="secondary" style={{ fontSize: '13px' }}>
                      {record.docDate && DateTimeUtil.forDisplay(record.docDate)}
                    </Text>
                  </div>
                );
              },
            },
            {
              title: <Text strong>លេខកូដ</Text>,
              dataIndex: 'id',
              key: 'id',
              align: 'center',
              render: (e, record) => (
                <Button
                  type="link"
                  onClick={() => {
                    onViewDetail(record);
                  }}
                >
                  {record.docNo}
                </Button>
              ),
            },
          ],
        },
        {
          title: <Text strong>{t('label.docIn')}</Text>,
          dataIndex: 'docIn.date',
          key: 'id',
          align: 'center',
          width: '160px',
          render: (e, record) => {
            const { docIn } = record;
            return (
              <>
                <Text>{docIn && docIn.no}</Text>
                <br />
                <Text type="secondary" style={{ fontSize: '13px' }}>
                  {docIn && docIn.date && DateTimeUtil.forDisplay(docIn.date)}
                </Text>
              </>
            );
          },
        },
        {
          title: <Text strong>{t('label.docOut')}</Text>,
          dataIndex: 'docOut.date',
          key: 'id',
          align: 'center',
          width: '160px',
          render: (e, record) => {
            const { docOut } = record;
            return (
              <Text type="secondary" style={{ fontSize: '13px' }}>
                {docOut && docOut.date && DateTimeUtil.forDisplay(docOut.date)}
              </Text>
            );
          },
        },
        {
          title: <Text strong>ស្ថានភាពឯកសារ</Text>,
          dataIndex: 'docStatus',
          key: 'id',
          align: 'center',
          width: '136px',
          render: (e, record) => <Text>{DOC_STATUS_LABEL[record.docStatus]}</Text>,
        },
        {
          title: <Text strong>ខ្លឹមសារលម្អិត</Text>,
          key: 'id',
          align: 'center',
          width: '180px',
          render: (e, record) => {
            return (
              <Space size="middle">
                <Button
                  size="small"
                  type="link"
                  onClick={() => {
                    onViewDetail(record);
                  }}
                >
                  លម្អិត
                </Button>
              </Space>
            );
          },
        },
      ]}
    />
  );
}

export default HomeList;
