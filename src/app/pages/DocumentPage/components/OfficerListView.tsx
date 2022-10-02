import React from 'react';
import { Table, Button, Space } from 'antd';
import AppRoute from 'utils/AppRoute';
import DateTimeUtil from 'utils/DateTimeUtil';
import Text from 'antd/lib/typography/Text';
import { ApiRoute } from 'utils';
import { ColumnsType } from 'antd/lib/table';
import TableActionMenu from './TableActionMenu';
import DocStatus from './DocStatus';
import { FcApproval } from 'react-icons/fc';
import RenderQuillValue from 'app/components/UI/RichTextEditor/RenderQuillValue';

export function OfficerListView({ items, loading, pagination, onViewDetail, onPageChange, onPrintDoc }) {
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
      title: <Text strong>ប្រភេទលិខិត</Text>,
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (_e, { docTypeId }) => <Text>{docTypeId && docTypeId.name}</Text>,
    },
    {
      title: (
        <Text strong>
          ព័ត៌មានឯកសារ <br />
          (លេខលិខិត, ប្រភពលិខិត, កាលបរិច្ឆេទ)
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
      title: <Text strong>ខ្លឹមសារលិខិត</Text>,
      dataIndex: 'id',
      key: 'id',
      width: 220,
      render: (_e, { docDescription }) => <RenderQuillValue content={docDescription} />,
    },
    {
      title: <Text strong>លេខចូលខេត្ត</Text>,
      dataIndex: 'id',
      key: 'id',
      align: 'center',
      width: 100,
      render: (_e, { docIn }) => <Text>{docIn && docIn.no}</Text>,
    },
    {
      title: <Text strong>កាលបរិច្ឆទចូលខេត្ត</Text>,
      dataIndex: 'id',
      key: 'id',
      width: 120,
      render: (_e, { docIn }) =>
        docIn &&
        docIn.date && (
          <Space direction="vertical" size={0}>
            <Text style={{ fontSize: '13px' }}>{DateTimeUtil.formatDate(docIn.date)}</Text>
            <Text type="secondary" style={{ fontSize: '12px' }}>
              {DateTimeUtil.formatTime(docIn.date)}
            </Text>
          </Space>
        ),
    },
    {
      title: <Text strong>ចំណារឯកសារ</Text>,
      align: 'center',
      dataIndex: 'signDate',
      key: 'signDate',
      width: 64,
      render: (_e, { isSign }) => {
        return isSign && <FcApproval size="28px" />;
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
