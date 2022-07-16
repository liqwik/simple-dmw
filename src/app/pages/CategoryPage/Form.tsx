import React, { useEffect } from 'react';
import {
  Col,
  Row,
  Input,
  Button,
  InputNumber,
  Form,
  Space,
  Switch,
} from 'antd';
import { SingleUpload } from 'app/components/Uploader';

interface IFormProps {
  form?: any;
  initialValue?: object;
  loading?: boolean;
  editData?: any;
  validateErrors?: any;
  onSubmit?: any;
  onReset?: any;
}

export function CategoryForm({
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

  const handleUpload = imgData => {
    form.setFieldsValue({
      imgUrl: imgData.url,
    });
  };

  const handleNameChange = e => {
    return e.target.value.replace(/[^\w\s&-]/gi, '');
  };

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
            label="Name"
            name="name"
            rules={[{ required: true, message: 'Please input category name' }]}
            getValueFromEvent={handleNameChange}
          >
            <Input placeholder=" Category Name" />
          </Form.Item>

          <Form.Item label="Order" name="order">
            <InputNumber />
          </Form.Item>

          <Form.Item hidden name="imgUrl">
            <Input type="hidden" />
          </Form.Item>

          <SingleUpload
            onUpload={handleUpload}
            imgSrc={editData && editData.imgUrl}
          />

          <Form.Item name="active" valuePropName="checked">
            <Switch checkedChildren="Active" unCheckedChildren="Deactive" />
          </Form.Item>
        </Col>
      </Row>

      <Row justify="end">
        <Col>
          <Space>
            <Button onClick={onReset} block>
              Reset
            </Button>
            <Button htmlType="submit" type="primary" block loading={loading}>
              {editData && editData.id ? 'Update' : 'Save'}
            </Button>
          </Space>
        </Col>
      </Row>
    </Form>
  );
}
