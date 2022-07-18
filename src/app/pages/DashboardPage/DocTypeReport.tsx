import React from 'react';
import { Table, Typography } from 'antd';

const { Text } = Typography;

const columns = [
  {
    title: '',
    dataIndex: 'name',
  },
  {
    title: 'មានចំណារ',
    children: [
      {
        title: 'ឯកសារធម្មតា',
        dataIndex: 'totalDoc.signed.normal',
        render: (_e, record) => <Text>{record?.totalDoc?.signed?.normal || 0}</Text>,
      },
      {
        title: 'ប្រញាប់',
        dataIndex: 'totalDoc.signed.urgent',
        render: (_e, record) => <Text>{record?.totalDoc?.signed?.urgent || 0}</Text>,
      },
      {
        title: 'ឯកសារបានចាររួច',
        dataIndex: 'totalDoc.signed.signature',
        render: (_e, record) => <Text>{record?.totalDoc?.signed?.signature || 0}</Text>,
      },
      {
        title: <Text strong>ចំនួនលិខិតសរុប</Text>,
        dataIndex: 'id',
        render: (_e, record) => {
          let total = 0;
          total += record?.totalDoc?.signed?.normal || 0;
          total += record?.totalDoc?.signed?.urgent || 0;
          total += record?.totalDoc?.signed?.signature || 0;

          return <Text strong>{total}</Text>;
        },
      },
    ],
  },
  {
    title: 'មិនទាន់ចារ',
    children: [
      {
        title: 'ឯកសារធម្មតា',
        dataIndex: 'totalDoc.not_sign.normal',
        render: (_e, record) => <Text>{record?.totalDoc?.not_sign?.normal || 0}</Text>,
      },
      {
        title: 'ប្រញាប់',
        dataIndex: 'totalDoc.not_sign.urgent',
        render: (_e, record) => <Text>{record?.totalDoc?.not_sign?.urgent || 0}</Text>,
      },
      {
        title: 'ឯកសារបានចាររួច',
        dataIndex: 'totalDoc.not_sign.signature',
        render: (_e, record) => <Text>{record?.totalDoc?.not_sign?.signature || 0}</Text>,
      },
      {
        title: <Text strong>ចំនួនលិខិតសរុប</Text>,
        dataIndex: 'id',
        render: (_e, record) => {
          let total = 0;
          total += record?.totalDoc?.not_sign?.normal || 0;
          total += record?.totalDoc?.not_sign?.urgent || 0;
          total += record?.totalDoc?.not_sign?.signature || 0;

          return <Text strong>{total}</Text>;
        },
      },
    ],
  },
];

function DocTypeReport({ data }) {
  return (
    <Table
      size="small"
      rowKey="id"
      columns={columns}
      dataSource={data}
      pagination={false}
      bordered
      summary={pageData => {
        const signed = {
          normal: 0,
          urgent: 0,
          signature: 0,
        };
        const notSign = {
          normal: 0,
          urgent: 0,
          signature: 0,
        };
        pageData.forEach(({ totalDoc }) => {
          signed.normal += totalDoc?.signed?.normal || 0;
          signed.urgent += totalDoc?.signed?.urgent || 0;
          signed.signature += totalDoc?.signed?.signature || 0;

          notSign.normal += totalDoc?.not_sign?.normal || 0;
          notSign.urgent += totalDoc?.not_sign?.urgent || 0;
          notSign.signature += totalDoc?.not_sign?.signature || 0;
        });

        return (
          <>
            <Table.Summary.Row style={{ backgroundColor: '#ccc' }}>
              <Table.Summary.Cell index={1}>សរុប</Table.Summary.Cell>
              <Table.Summary.Cell index={2}>
                <Text>{signed.normal}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={3}>
                <Text>{signed.urgent}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={4}>
                <Text>{signed.signature}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={5}>
                <Text>{signed.normal + signed.urgent + signed.signature}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={6}>
                <Text>{notSign.normal}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={7}>
                <Text>{notSign.urgent}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={8}>
                <Text>{notSign.signature}</Text>
              </Table.Summary.Cell>
              <Table.Summary.Cell index={9}>
                <Text>{notSign.normal + notSign.urgent + notSign.signature}</Text>
              </Table.Summary.Cell>
            </Table.Summary.Row>
          </>
        );
      }}
    />
  );
}

export default DocTypeReport;
