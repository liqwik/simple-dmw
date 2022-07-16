import React, { useEffect } from 'react';
import { Col, Row, Form, Space, Button } from 'antd';
import { MySelect, MyTextInput } from 'app/components/UI/Form';

type IUserForm = {
  form?: any;
  initialValue?: object;
  loading?: boolean;
  editData?: any;
  validateErrors?: any;
  onSubmit?: any;
  onReset?: any;
  [props: string]: any;
};

export function UserForm({
  form,
  initialValue,
  loading,
  editData,
  validateErrors,
  onReset,
  onSubmit,
  ...props
}: IUserForm) {
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
    <>
      <Form
        layout="vertical"
        form={form}
        initialValues={initialValue}
        onFinish={onSubmit}
        {...props}
      >
        <Row gutter={16}>
          <Col span={24}>
            <MyTextInput
              label="នាមត្រកូល"
              name="fn"
              rules={[
                {
                  required: true,
                  message: 'សូមបំពេញនាមត្រកូល',
                },
              ]}
            />

            <MyTextInput
              label="នាម"
              name="ln"
              rules={[
                {
                  required: true,
                  message: 'សូមបំពេញនាម',
                },
              ]}
            />

            <MyTextInput
              label="លេខទូរស័ព្ទ"
              name="ph"
              placeholder="010876543"
            />

            <MySelect label="ភេទ" name="sex" placeholder="ជ្រើសរើសភេទ">
              <MySelect.Option value="m">ប្រុស</MySelect.Option>
              <MySelect.Option value="f">ស្រី</MySelect.Option>
            </MySelect>

            <MySelect
              label="ប្រភេទមន្ត្រី"
              name="userType"
              placeholder="ជ្រើសរើសប្រភេទមន្ត្រី"
            >
              <MySelect.Option value="assistant">ក្រុមជំនួយការ</MySelect.Option>
              <MySelect.Option value="other">ផ្សេងៗ</MySelect.Option>
            </MySelect>
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
    </>
  );
}
