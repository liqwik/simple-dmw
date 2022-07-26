import React, { useEffect } from 'react';
import { Col, Row, Card, Form, Space, DatePicker, Radio, Input, FormInstance } from 'antd';
import { cardOpts, formItemLayout, fieldVerticle } from './FormStyles';
import { MySelect, MySubmitButton, MyTextInput } from 'app/components/UI/Form';
import { SaveOutlined } from '@ant-design/icons';
import { AppLayoutWithHeader } from 'app/components/UI/Layout';
import { FieldErrorMsg } from 'app/components/UI/Message';
import moment from 'moment';
import useDocType from 'hooks/useDocType';
import { AppStorage } from 'utils';
import { DOC_STATUS_LABEL } from 'utils/constants';
import { InstitutionDropdown } from 'app/features/InstitutionDropdown/InstitutionDropdown';
import { UserDropdown } from 'app/features/UserDropdown';
import DateTimeUtil from 'utils/DateTimeUtil';

type IDocumentForm = {
  form: FormInstance;
  isSubmitting?: boolean;
  isEdit?: boolean;
  editDocument?: any;
  validateErrors?: any;
  serviceError?: any;
  onSubmit?: any;
};

export default function DocumentForm({
  form,
  isSubmitting,
  isEdit,
  editDocument,
  validateErrors,
  serviceError,
  onSubmit,
}: IDocumentForm) {
  const [docTypeList]: any = useDocType();
  const isAdmin = AppStorage.getAuthData() && AppStorage.getAuthData().isAdmin;

  /** Mounting & Updating */
  useEffect(() => {
    if (validateErrors && validateErrors.length > 0) {
      form.setFields(validateErrors);
    }

    if (isEdit && editDocument) {
      const { docDate, docIn, docOut, issueDate, receivedDate, signDate } = editDocument;

      form.setFieldsValue({
        ...editDocument,
        docDate: docDate && moment(docDate),
        docIn: {
          ...docIn,
          date: docIn && docIn.date && moment(docIn.date),
          sender: docIn && docIn.sender && docIn.sender.id,
          receiver: docIn && docIn.receiver && docIn.receiver.id,
          senderDate: docIn && docIn.senderDate && moment(docIn.senderDate),
          receiverDate: docIn && docIn.receiverDate && moment(docIn.receiverDate),
        },
        docOut: {
          ...docOut,
          date: docOut && docOut.date && moment(docOut.date),
          sender: docOut && docOut.sender && docOut.sender.id,
          receiver: docOut && docOut.receiver && docOut.receiver.id,
        },
        issueDate: issueDate && moment(issueDate),
        receivedDate: receivedDate && moment(receivedDate),
        signDate: signDate && moment(signDate),
      });
    }
  }, [form, editDocument, isEdit, validateErrors]);

  const handleSubmit = fieldsValue => {
    const { docDate, docIn, docOut, issueDate, receivedDate, signDate } = fieldsValue;
    const defaultDateFormat = 'YYYY-MM-DD HH:mm:ss';

    const values = {
      ...fieldsValue,
      docDate: docDate && docDate.format('YYYY-MM-DD'),
      docIn: {
        ...docIn,
        date: docIn && docIn.date && docIn.date.format(defaultDateFormat),
        senderDate: docIn && docIn.senderDate && docIn.senderDate.format(defaultDateFormat),
        receiverDate: docIn && docIn.receiverDate && docIn.receiverDate.format(defaultDateFormat),
      },
      docOut: {
        ...docOut,
        date: docOut && docOut.date && docOut.date.format(defaultDateFormat),
        senderDate: docOut && docOut.senderDate && docOut.senderDate.format(defaultDateFormat),
        receiverDate: docOut && docOut.receiverDate && docOut.receiverDate.format(defaultDateFormat),
      },
      issueDate: issueDate && issueDate.format(defaultDateFormat),
      receivedDate: receivedDate && receivedDate.format(defaultDateFormat),
      signDate: signDate && signDate.format(defaultDateFormat),
    };

    onSubmit(values);
  };

  const handleDocInSenderSelect = value => {
    form.setFieldsValue({ docIn: { sender: value } });
  };

  const handleDocInReceiverSelect = value => {
    form.setFieldsValue({ docIn: { receiver: value } });
  };

  const handleDocDateChange = value => {
    const lunarDate = DateTimeUtil.formatLunarDate(value);

    form.setFieldsValue({ docLunarDate: lunarDate });
  };

  return (
    <>
      <Form {...formItemLayout} form={form} layout="horizontal" onFinish={handleSubmit}>
        <AppLayoutWithHeader
          title={`${isEdit ? 'កែប្រែ' : 'បង្កើត'} ឯកសារ`}
          bg="transparent"
          padding="0"
          extra={[
            <MySubmitButton type="primary" icon={<SaveOutlined />} loading={isSubmitting}>
              {isEdit ? 'កែប្រែ' : 'រក្សាទុក'}
            </MySubmitButton>,
          ]}
        >
          <Row gutter={[15, 15]}>
            <Col span={16} offset={4}>
              <Card title="ព័ត៌មានឯកសារ" {...cardOpts}>
                <MyTextInput
                  label="លិខិតលេខ"
                  name="docNo"
                  rules={[
                    {
                      required: true,
                      message: 'សូមបំពេញឱ្យបានត្រឹមត្រូវ',
                    },
                  ]}
                />
                <Form.Item name="docDate" label="កាលបរិច្ឆេទលិខិត">
                  <DatePicker format="DD-MM-YYYY" placeholder="ជ្រើសរើសកាលបរិច្ឆេទ" onChange={handleDocDateChange} />
                </Form.Item>

                <Form.Item noStyle shouldUpdate={(prevValues, curValues) => prevValues.docDate !== curValues.docDate}>
                  {() => (
                    <Form.Item name="docLunarDate" label="កាលបរិច្ឆេទចន្ទគតិ">
                      <Input.TextArea placeholder="ថ្ងៃព្រហស្បតិ៍ ១៤កើត ខែភទ្របទ ឆ្នាំកុរ ឯកស័ក​ ព.ស.២៥៦៣" rows={2} />
                    </Form.Item>
                  )}
                </Form.Item>

                <InstitutionDropdown
                  onSelectedValue={value => {
                    form.setFieldsValue({ institutionId: value });
                  }}
                />

                <Form.Item name="docDescription" label="កម្មវត្ថុ">
                  <Input.TextArea rows={6} />
                </Form.Item>

                <MySelect name="docTypeId" label="ប្រភេទឯកសារ" placeholder="ជ្រើសរើសប្រភេទឯកសារ">
                  {docTypeList &&
                    docTypeList.map(docType => (
                      <MySelect.Option key={docType.id} value={docType.id}>
                        {docType.name}
                      </MySelect.Option>
                    ))}
                </MySelect>

                <Form.Item name="docStatus" label="ស្ថានភាពឯកសារ">
                  <Radio.Group>
                    <Space direction="vertical">
                      <Radio value="normal">{DOC_STATUS_LABEL.normal}</Radio>
                      <Radio value="urgent">{DOC_STATUS_LABEL.urgent}</Radio>
                      <Radio value="signature">{DOC_STATUS_LABEL.signature}</Radio>
                    </Space>
                  </Radio.Group>
                </Form.Item>
              </Card>

              <Card title="ឯកសារចូល" {...cardOpts}>
                <MyTextInput name={['docIn', 'no']} label="លេខចូលខេត្ត" />

                <Form.Item name={['docIn', 'date']} label="កាលបរិច្ឆេទចូលខេត្ត">
                  <DatePicker showTime format="DD-MM-YYYY HH:mm A" placeholder="ជ្រើសរើសកាលបរិច្ឆេទ" />
                </Form.Item>

                {isAdmin && (
                  <Card
                    title="ព័ត៌មានអ្នកប្រគល់ និងអ្នកទទួល"
                    bordered={false}
                    size="small"
                    style={{
                      margin: '0 36px',
                      padding: '8px 16px',
                      backgroundColor: '#f4f4f4',
                    }}
                    headStyle={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    <Row gutter={8} style={{ marginBottom: '16px' }}>
                      <Col span={16}>
                        <UserDropdown
                          type="other"
                          name={['docIn', 'sender']}
                          label="អ្នកប្រគល់"
                          placeholder="ជ្រើសរើសអ្នកប្រគល់"
                          selectedValue={editDocument && editDocument.docIn && editDocument.docIn.sender}
                          onSelectedValue={handleDocInSenderSelect}
                          {...fieldVerticle}
                        />
                      </Col>

                      <Col span={8}>
                        <Form.Item name={['docIn', 'senderDate']} {...fieldVerticle}>
                          <DatePicker showTime format="DD-MM-YYYY HH:mm A" placeholder="ជ្រើសរើសកាលបរិច្ឆេទ" />
                        </Form.Item>
                      </Col>
                    </Row>

                    <Row gutter={8}>
                      <Col span={16}>
                        <UserDropdown
                          type="assistant"
                          name={['docIn', 'receiver']}
                          label="អ្នកទទួល"
                          placeholder="ជ្រើសរើសអ្នកទទួល"
                          selectedValue={editDocument && editDocument.docIn && editDocument.docIn.receiver}
                          onSelectedValue={handleDocInReceiverSelect}
                          {...fieldVerticle}
                        />
                      </Col>
                      <Col span={8}>
                        <Form.Item name={['docIn', 'receiverDate']} {...fieldVerticle}>
                          <DatePicker showTime format="DD-MM-YYYY HH:mm A" placeholder="ជ្រើសរើសកាលបរិច្ឆេទ" />
                        </Form.Item>
                      </Col>
                    </Row>
                  </Card>
                )}
              </Card>

              {isAdmin && (
                <Card title="ចំណារឯកសារ" {...cardOpts}>
                  <Form.Item name="signRemark" label="ចំណារ ឯ.ឧ អភិបាលខេត្ត">
                    <Input.TextArea rows={4} />
                  </Form.Item>

                  <Form.Item name="signDate" label="កាលបរិច្ឆេទ">
                    <DatePicker showTime format="DD-MM-YYYY HH:mm A" placeholder="ជ្រើសរើសកាលបរិច្ឆេទ" />
                  </Form.Item>
                </Card>
              )}

              {isAdmin && (
                <Card title="ឯកសារចេញ" {...cardOpts}>
                  <Form.Item name={['docOut', 'date']} label="កាលបរិច្ឆេទបញ្ចេញឯកសារ">
                    <DatePicker showTime format="DD-MM-YYYY HH:mm A" placeholder="ជ្រើសរើសកាលបរិច្ឆេទ" />
                  </Form.Item>

                  <Card
                    title="ព័ត៌មានអ្នកប្រគល់ និងអ្នកទទួល"
                    bordered={false}
                    size="small"
                    style={{
                      margin: '0 36px',
                      padding: '8px 16px',
                      backgroundColor: '#f4f4f4',
                    }}
                    headStyle={{
                      fontSize: '14px',
                      fontWeight: 'bold',
                    }}
                  >
                    <Row gutter={8} style={{ marginBottom: '16px' }}>
                      <Col span={16}>
                        <UserDropdown
                          type="assistant"
                          name={['docOut', 'sender']}
                          label="អ្នកប្រគល់"
                          placeholder="ជ្រើសរើសអ្នកប្រគល់"
                          selectedValue={editDocument && editDocument.docOut && editDocument.docOut.sender}
                          onSelectedValue={value => {
                            form.setFieldsValue({ docOut: { sender: value } });
                          }}
                          {...fieldVerticle}
                        />
                      </Col>
                    </Row>

                    <Row gutter={8}>
                      <Col span={16}>
                        <UserDropdown
                          type="other"
                          name={['docOut', 'receiver']}
                          label="អ្នកទទួល"
                          placeholder="ជ្រើសរើសអ្នកទទួល"
                          selectedValue={editDocument && editDocument.docOut && editDocument.docOut.receiver}
                          onSelectedValue={value => {
                            form.setFieldsValue({
                              docOut: { receiver: value },
                            });
                          }}
                          {...fieldVerticle}
                        />
                      </Col>
                    </Row>
                  </Card>
                </Card>
              )}

              {isAdmin && (
                <Card title="ព័ត៌មានបន្ថែម" {...cardOpts}>
                  <Form.Item name="remark" label="កំណត់ត្រាផ្សេងៗ">
                    <Input.TextArea rows={6} />
                  </Form.Item>

                  <Form.Item name="resourceLink" label="តំណរភ្ជាប់ឯកសារដើម">
                    <Input />
                  </Form.Item>
                </Card>
              )}

              {serviceError && <FieldErrorMsg msg={serviceError} />}
            </Col>
          </Row>
        </AppLayoutWithHeader>
      </Form>
    </>
  );
}
