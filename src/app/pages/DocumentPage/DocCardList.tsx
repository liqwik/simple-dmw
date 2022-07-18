import React from 'react';
import { Button, Card, Col, Divider, Row, Space, Tag, Typography } from 'antd';
import DisplayDateTime from 'app/components/DateTime/DisplayDateTime';
import { displayValue, getUserFullName } from 'utils/string';
import DescriptionItem from 'app/components/Utilities/Display/DescriptionItem';
import { DOC_STATUS_LABEL } from 'utils/constants';
import SignRemark from './components/SignRemark';
import Paragraph from 'antd/lib/typography/Paragraph';
import EditButton from './components/EditButton';
import AppRoute from 'utils/AppRoute';
import PrintButton from './components/PrintButton';
import DownloadButton from './components/DownloadButton';
import { ApiRoute } from 'utils';

const { Text } = Typography;

function DocCardList({ item, loading, pagination, onViewDetail, onPageChange, onPrintDoc }) {
  const {
    docNo,
    docTypeId,
    docDescription,
    institutionId,
    docDate,
    docIn,
    docOut,
    signDate,
    isSign,
    signRemark,
    docStatus,
  } = item;

  console.log(loading, pagination, onPageChange);
  return (
    <Card
      size="small"
      title={
        <Space direction="vertical" size={0}>
          <Button
            type="link"
            style={{ padding: '0', fontSize: '1rem', fontWeight: 'bold' }}
            onClick={() => onViewDetail(item)}
          >
            {docNo}
          </Button>
          <DisplayDateTime value={docDate} />
        </Space>
      }
      actions={[
        <EditButton key="edit" to={`${AppRoute.document}/edit/${item.id}`} />,
        <PrintButton key="print" onPrint={() => onPrintDoc({ filePath: `${ApiRoute.document(item.id)}/export` })} />,
        <DownloadButton key="download" src={`${ApiRoute.document(item.id)}/export`} />,
      ]}
    >
      <Row>
        <Col span={16}>
          <DescriptionItem title="អង្គភាព/ស្ថាប័ន" content={displayValue(institutionId && institutionId.name)} />
        </Col>
        <Col span={8}>
          <DescriptionItem title="ប្រភេទឯកសារ" content={displayValue(docTypeId && docTypeId.name)} />
        </Col>
      </Row>

      <Row>
        <Col span={16}>
          <DescriptionItem
            title="ស្ថានភាពឯកសារ"
            content={
              <Tag color={docStatus === 'signature' ? 'green' : docStatus === 'urgent' ? 'red' : 'blue'}>
                {DOC_STATUS_LABEL[docStatus]}
              </Tag>
            }
          />
        </Col>

        <Col span={8}>
          <DescriptionItem title="ចំណារឯកសារ" content={isSign && <SignRemark remark={signRemark} date={signDate} />} />
        </Col>
        <Col span={24}>
          <DescriptionItem
            title="កម្មវត្ថុ"
            content={
              <Paragraph ellipsis={{ rows: 1, expandable: true, symbol: 'អានបន្ថែម' }}>
                {displayValue(docDescription)}
              </Paragraph>
            }
          />
        </Col>
      </Row>

      <Divider>
        <Text strong>ឯកសារចូល</Text>
      </Divider>

      <Row>
        <Col span={24}>
          <DescriptionItem
            title="លេខចូលខេត្ត"
            content={
              <Space direction="vertical" size={0}>
                <Text>{displayValue(docIn && docIn.no)}</Text>
                <DisplayDateTime value={docIn && docIn.date} />
              </Space>
            }
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="អ្នកប្រគល់ឯកសារ"
            content={
              <Space direction="vertical" size={0}>
                {getUserFullName(docIn && docIn.sender)}
                <DisplayDateTime value={docIn && docIn.senderDate} />
              </Space>
            }
            style={{ marginBottom: 0 }}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="អ្នកទទួលឯកសារ"
            content={
              <Space direction="vertical" size={0}>
                {getUserFullName(docIn && docIn.receiver)}
                <DisplayDateTime value={docIn && docIn.receiverDate} />
              </Space>
            }
            style={{ marginBottom: 0 }}
          />
        </Col>
      </Row>

      <Divider>
        <Text strong>ឯកសារចេញ</Text>
      </Divider>

      <Row>
        <Col span={24}>
          <DescriptionItem title="កាលបរិច្ឆេទបញ្ចេញឯកសារ" content={<DisplayDateTime value={docOut && docOut.date} />} />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="អ្នកប្រគល់ឯកសារ"
            content={
              <Space direction="vertical" size={0}>
                {getUserFullName(docOut && docOut.sender)}
                <DisplayDateTime value={docOut && docOut.senderDate} />
              </Space>
            }
            style={{ marginBottom: 0 }}
          />
        </Col>
        <Col span={12}>
          <DescriptionItem
            title="អ្នកទទួលឯកសារ"
            content={
              <Space direction="vertical" size={0}>
                {getUserFullName(docOut && docOut.receiver)}
                <DisplayDateTime value={docOut && docOut.receiverDate} />
              </Space>
            }
            style={{ marginBottom: 0 }}
          />
        </Col>
      </Row>
    </Card>
  );
}

export default DocCardList;
