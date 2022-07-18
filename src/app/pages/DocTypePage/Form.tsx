import React, { useEffect } from 'react';
import { Col, Row, Input, Button, Form, Space } from 'antd';

interface IFormProps {
  form?: any;
  initialValue?: object;
  loading?: boolean;
  editData?: any;
  validateErrors?: any;
  onSubmit?: any;
  onReset?: any;
}

export function DocTypeForm({ form, initialValue, loading, editData, validateErrors, onReset, onSubmit }: IFormProps) {
  /** Mounting & Updating */
  useEffect(() => {
    if (validateErrors && validateErrors.length > 0) {
      form.setFields(validateErrors);
    }

    if (editData && Object.keys(editData).length > 0) {
      form.setFieldsValue({ ...editData });
    }
  }, [form, editData, validateErrors]);

  return (
    <Form layout="vertical" form={form} initialValues={initialValue} onFinish={onSubmit}>
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="ឈ្មោះប្រភេទឯកសារ"
            name="name"
            rules={[{ required: true, message: 'Please input docType name' }]}
          >
            <Input placeholder="បញ្ចូលឈ្មោះប្រភេទឯកសារ" />
          </Form.Item>

          <Form.Item label="លេខកូដ" name="code" rules={[{ required: true, message: 'Please input docType name' }]}>
            <Input placeholder="លេខកូដ" />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="end">
        <Col>
          <Space>
            <Button onClick={onReset} block>
              សម្អាត
            </Button>
            <Button htmlType="submit" type="primary" block loading={loading}>
              {editData && editData.id ? 'កែប្រែ' : 'រក្សាទុក'}
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}
