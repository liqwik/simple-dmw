import React from 'react';
import { Drawer, Row, Badge, Col, Space, Card, Typography } from 'antd';
import DateTimeUtil from 'utils/DateTimeUtil';
import {
  FileTextOutlined,
  CompassTwoTone,
  ExportOutlined,
  ImportOutlined,
  MessageOutlined,
  EditOutlined,
} from '@ant-design/icons';
import { getUserFullName } from 'utils/string';
import { DOC_STATUS_LABEL } from 'utils/constants';
import DescriptionItem from 'app/components/Utilities/Display/DescriptionItem';
import { FcApproval } from 'react-icons/fc';
import { AppStorage } from 'utils';
import { useTranslation } from 'react-i18next';

const { Title } = Typography;

const iconTitleProps: any = {
  style: { fontSize: '18px', color: '#096dd9' },
};
const cardTitleStyle: any = {
  style: { color: '#096dd9', lineHeight: '1.25em', marginBottom: '0' },
};
const cardProps: any = {
  size: 'small',
  headStyle: { padding: '4px 12px', lineHeight: '1em' },
  bodyStyle: {
    paddingTop: '28px',
    paddingLeft: '16px',
  },
};

function DocumentDetail({ item, visible, onClose }: any) {
  const { t } = useTranslation();
  const isAdmin = AppStorage.getAuthData() && AppStorage.getAuthData().isAdmin;

  const {
    docNo,
    docDate,
    docStatus,
    docTypeId,
    docDescription,
    institutionId,
    docIn,
    docOut,
    remark,
    signRemark,
    isSign,
    signDate,
    resourceLink,
  } = item || {};

  return (
    <Drawer width={720} placement="right" closable={true} onClose={onClose} visible={visible}>
      <Card
        title={
          <Space align="start">
            <FileTextOutlined {...iconTitleProps} />
            <Title level={5} {...cardTitleStyle}>
              ព័ត៌មានឯកសារ
            </Title>
            {isSign && <FcApproval size="18px" />}
          </Space>
        }
        {...cardProps}
      >
        <Row gutter={[16, 8]}>
          <Col span={12}>
            <DescriptionItem title="អង្គភាព/ស្ថាប័ន" content={institutionId && institutionId.name} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="លិខិតលេខ" content={docNo} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="កាលបរិច្ឆេទលិខិត" content={DateTimeUtil.forDisplay(docDate)} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="ប្រភេទឯកសារ" content={docTypeId && docTypeId.name} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="កម្មវត្ថុ" content={docDescription} />
          </Col>
          <Col span={12}>
            <DescriptionItem
              title="ស្ថានភាពឯកសារ"
              content={
                <Badge
                  status={docStatus === 'signature' ? 'success' : docStatus === 'urgent' ? 'error' : 'warning'}
                  text={DOC_STATUS_LABEL[docStatus]}
                />
              }
            />
          </Col>
        </Row>
      </Card>
      <br />

      {isAdmin && (
        <Card
          title={
            <Space align="start">
              <EditOutlined {...iconTitleProps} />
              <Title level={5} {...cardTitleStyle}>
                ចំណារឯកសារ
              </Title>
            </Space>
          }
          {...cardProps}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <DescriptionItem title="ចំណារ ឯ.ឧ អភិបាលខេត្ត" content={signRemark} />
            </Col>
            <Col span={24}>
              <DescriptionItem title="កាលបរិច្ឆេទចំណារ" content={DateTimeUtil.forDisplay(signDate)} />
            </Col>
          </Row>
        </Card>
      )}

      <br />

      <Card
        title={
          <Space align="start">
            <ExportOutlined {...iconTitleProps} />
            <Title level={5} {...cardTitleStyle}>
              {t('label.docIn')}
            </Title>
          </Space>
        }
        {...cardProps}
      >
        <Row gutter={[16, 16]}>
          <Col span={12}>
            <DescriptionItem title="លេខចូលខេត្ត" content={docIn && docIn.no} />
          </Col>
          <Col span={12}>
            <DescriptionItem title="កាលបរិច្ឆេទចូលខេត្ត" content={DateTimeUtil.forDisplay(docIn && docIn.date)} />
          </Col>
          {isAdmin && (
            <>
              <Col span={12}>
                <DescriptionItem
                  title="អ្នកប្រគល់ឯកសារ"
                  content={getUserFullName(docIn && docIn.sender)}
                  style={{ marginBottom: 0 }}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="កាលបរិច្ឆេទប្រគល់"
                  content={DateTimeUtil.forDisplay(docIn && docIn.senderDate)}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="អ្នកទទួលឯកសារ"
                  content={getUserFullName(docIn && docIn.receiver)}
                  style={{ marginBottom: 0 }}
                />
              </Col>
              <Col span={12}>
                <DescriptionItem
                  title="កាលបរិច្ឆេទទទួល"
                  content={DateTimeUtil.forDisplay(docIn && docIn.receiverDate)}
                />
              </Col>
            </>
          )}
        </Row>
      </Card>
      <br />

      {isAdmin && (
        <Card
          title={
            <Space align="start">
              <ImportOutlined {...iconTitleProps} />
              <Title level={5} {...cardTitleStyle}>
                {t('label.docOut')}
              </Title>
            </Space>
          }
          {...cardProps}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <DescriptionItem
                title="កាលបរិច្ឆេទបញ្ចេញឯកសារ"
                content={DateTimeUtil.forDisplay(docOut && docOut.date)}
              />
            </Col>
            <Col span={24}>
              <DescriptionItem
                title="អ្នកប្រគល់ឯកសារ"
                content={getUserFullName(docOut && docOut.sender)}
                style={{ marginBottom: 0 }}
              />
            </Col>
            <Col span={24}>
              <DescriptionItem
                title="អ្នកទទួលឯកសារ"
                content={getUserFullName(docOut && docOut.receiver)}
                style={{ marginBottom: 0 }}
              />
            </Col>
          </Row>
        </Card>
      )}
      <br />

      {isAdmin && (
        <Card
          title={
            <Space align="start">
              <MessageOutlined {...iconTitleProps} />
              <Title level={5} {...cardTitleStyle}>
                ព័ត៌មានបន្ថែម
              </Title>
            </Space>
          }
          {...cardProps}
        >
          <Row gutter={[16, 16]}>
            <Col span={24}>
              <DescriptionItem title="កំណត់ត្រាផ្សេងៗ" content={remark} />
            </Col>

            {resourceLink && (
              <Col span={24}>
                <Space align="center">
                  <div style={{ lineHeight: '1px' }}>
                    <CompassTwoTone />
                  </div>
                  <a href={resourceLink} target="_blank" rel="noreferrer">
                    តំណរភ្ជាប់ឯកសារដើម
                  </a>
                </Space>
              </Col>
            )}
          </Row>
        </Card>
      )}
    </Drawer>
  );
}

export default DocumentDetail;
