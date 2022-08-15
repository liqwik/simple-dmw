import React from 'react';
import { Table, Button } from 'antd';
import AppRoute from 'utils/AppRoute';
import DateTimeUtil from 'utils/DateTimeUtil';
import Text from 'antd/lib/typography/Text';
import { ApiRoute } from 'utils';
import DisplayUserName from './components/DisplayUserName';
import { ColumnsType } from 'antd/lib/table';
import TableActionMenu from './components/TableActionMenu';
import DocStatus from './components/DocStatus';
import SignRemark from './components/SignRemark';
import { useTranslation } from 'react-i18next';

export function DocumentList({ items, loading, pagination, onViewDetail, onPageChange, onPrintDoc }) {
  const { t } = useTranslation();

  const columns: ColumnsType<any> = [
    {
      title: <Text strong>ល.រ</Text>,
      align: 'center',
      width: 56,
      render: (_e, _record, idx) => {
        const { current, pageSize } = pagination;
        const numRange = current * pageSize;
        const num = numRange - (numRange / current - (idx + 1));

        return <Text>{num}</Text>;
      },
    },
    {
      title: <Text strong>ស្ថានភាពឯកសារ</Text>,
      dataIndex: 'docStatus',
      key: 'id',
      width: 120,
      render: (_e, record) => <DocStatus value={record.docStatus} />,
    },
    {
      title: (
        <Text strong>
          ព័ត៌មានឯកសារ <br />
          (លេខកូដ, អង្គភាព/ស្ថាប័ន, កាលបរិច្ឆេទ)
        </Text>
      ),
      dataIndex: 'docNo',
      key: 'id',
      width: 220,
      render: (_e, record) => {
        const { institutionId } = record;

        return (
          <div>
            <Button type="link" style={{ padding: 0 }} onClick={() => onViewDetail(record)}>
              {record.docNo}
            </Button>
            <br />
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
      title: <Text strong>{t('label.docIn')}</Text>,
      align: 'center',
      children: [
        {
          title: <Text strong>លេខចូលខេត្ត</Text>,
          dataIndex: 'docIn.date',
          key: 'id',
          align: 'center',
          width: 100,
          className: 'no-border-right',
          render: (_e, record) => {
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
          title: <Text strong>អ្នកប្រគល់</Text>,
          dataIndex: 'docIn.sender',
          key: 'docIn.sender',
          align: 'center',
          width: 100,
          className: 'no-border-right',
          render: (_e, record) => <DisplayUserName user={record.docIn?.sender} />,
        },
        {
          title: <Text strong>អ្នកទទួល</Text>,
          dataIndex: 'docIn.receiver',
          key: 'docIn.receiver',
          align: 'center',
          width: 100,
          render: (_e, record) => <DisplayUserName user={record.docIn?.receiver} />,
        },
      ],
    },

    {
      title: <Text strong>{t('label.docOut')}</Text>,
      align: 'center',
      children: [
        {
          title: <Text strong>កាលបរិចេ្ឆទ</Text>,
          dataIndex: 'docOut.date',
          key: 'id',
          align: 'center',
          width: 100,
          className: 'no-border-right',
          render: (_e, record) => {
            const { docOut } = record;
            return (
              <Text type="secondary" style={{ fontSize: '13px' }}>
                {docOut && docOut.date && DateTimeUtil.forDisplay(docOut.date)}
              </Text>
            );
          },
        },
        {
          title: <Text strong>អ្នកប្រគល់</Text>,
          dataIndex: 'docOut.sender',
          key: 'docOut.sender',
          align: 'center',
          width: 100,
          className: 'no-border-right',
          render: (_e, record) => <DisplayUserName user={record.docOut?.sender} />,
        },
        {
          title: <Text strong>អ្នកទទួល</Text>,
          dataIndex: 'docOut.receiver',
          key: 'docOut.receiver',
          align: 'center',
          width: 100,
          render: (_e, record) => <DisplayUserName user={record.docOut?.receiver} />,
        },
      ],
    },

    {
      title: <Text strong>ចំណារឯកសារ</Text>,
      align: 'center',
      dataIndex: 'signDate',
      key: 'signDate',
      width: 64,
      render: (_e, record) => {
        const { isSign, signRemark, signDate } = record;

        return isSign && <SignRemark remark={signRemark} date={signDate} />;
      },
    },

    {
      title: <Text strong>ខ្លឹមសារលម្អិត</Text>,
      key: 'id',
      align: 'center',
      width: 110,
      fixed: 'right',
      render: (_e, record) => {
        return (
          <TableActionMenu
            onPrintDoc={() => onPrintDoc({ filePath: `${ApiRoute.document(record.id)}/export` })}
            editRoute={`${AppRoute.document}/edit/${record.id}`}
            downloadSrc={`${ApiRoute.document(record.id)}/export`}
          />
        );
      },
    },
  ];

  return (
    <Table
      bordered
      rowKey="id"
      size="small"
      className="doc-table"
      loading={loading}
      pagination={{
        ...pagination,
        showSizeChanger: true,
        pageSizeOptions: ['20', '50', '100'],
        size: 'default',
        showTotal: total => `Total ${total} items`,
      }}
      dataSource={items}
      scroll={{ x: 1180 }}
      columns={columns}
      onChange={onPageChange}
    />
  );
}
