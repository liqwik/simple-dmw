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

export function InstitutionForm({
  form,
  initialValue,
  loading,
  editData,
  validateErrors,
  onReset,
  onSubmit,
}: IFormProps) {
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
    <Form
      layout="vertical"
      form={form}
      initialValues={initialValue}
      onFinish={onSubmit}
    >
      <Row gutter={16}>
        <Col span={24}>
          <Form.Item
            label="ឈ្មោះអង្គភាព/ស្ថាប័ន"
            name="name"
            rules={[
              { required: true, message: 'Please input institution name' },
            ]}
          >
            <Input placeholder="បញ្ចូលឈ្មោះអង្គភាព/ស្ថាប័ន" />
          </Form.Item>

          <Form.Item name="description" label="ព័ត៌មានបន្តែម">
            <Input.TextArea />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="end">
        <Col>
          <Space>
            {onReset && (
              <Button onClick={onReset} block>
                សម្អាត
              </Button>
            )}
            <Button htmlType="submit" type="primary" block loading={loading}>
              {editData && editData.id ? 'កែប្រែ' : 'រក្សាទុក'}
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}
