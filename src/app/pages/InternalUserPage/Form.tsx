import React, { useEffect } from 'react';
import { Col, Row, Card, Form, Button } from 'antd';
import { cardOpts } from './FormStyles';
import { createPassword } from 'utils/auth';
import { MyPasswordInput, MySelect, MySubmitButton, MyTextInput } from 'app/components/UI/Form';
import { SaveOutlined } from '@ant-design/icons';
import { AppLayoutWithHeader } from 'app/components/UI/Layout';
import { FieldErrorMsg } from 'app/components/UI/Message';
import { useTranslation } from 'react-i18next';
import { ROLES } from 'utils/constants';

type IInternalUserForm = {
  form?: any;
  isSubmitting?: boolean;
  isEdit?: boolean;
  editInternalUser?: any;
  validateErrors?: any;
  serviceError?: any;
  onSubmit?: any;
  onDeleteSpec?: any;
};

function InternalUserForm({
  form,
  isSubmitting,
  isEdit,
  editInternalUser,
  validateErrors,
  serviceError,
  onSubmit,
}: IInternalUserForm) {
  const { t } = useTranslation();

  /** Mounting & Updating */
  useEffect(() => {
    if (validateErrors && validateErrors.length > 0) {
      form.setFields(validateErrors);
    }

    if (isEdit && editInternalUser) {
      form.setFieldsValue({ ...editInternalUser });
    }
  }, [form, editInternalUser, isEdit, validateErrors]);

  const handleSubmit = fieldsValue => {
    onSubmit(fieldsValue);
  };

  const onGeneratePassword = () => {
    const password = createPassword();

    form.setFieldsValue({
      pwd: password,
      confirmPwd: password,
    });
  };

  return (
    <>
      <Form
        layout="horizontal"
        labelCol={{ span: 6 }}
        wrapperCol={{ span: 18 }}
        initialValues={{ remember: true }}
        form={form}
        onFinish={handleSubmit}
      >
        <AppLayoutWithHeader
          title={`${isEdit ? 'កែប្រែ' : '​បង្កើត'} អ្នកប្រើប្រាស់ប្រព័ន្ធ`}
          bg="transparent"
          padding="0"
          extra={[
            <MySubmitButton type="primary" icon={<SaveOutlined />} loading={isSubmitting}>
              {isEdit ? 'Update' : 'Save'}
            </MySubmitButton>,
          ]}
        >
          <Row gutter={[15, 15]}>
            <Col span={16} offset={4}>
              <Card {...cardOpts}>
                <MyTextInput
                  label="Username"
                  name="usr"
                  rules={[
                    {
                      required: true,
                      message: 'Please input username',
                    },
                  ]}
                />

                <MyTextInput
                  label="Email"
                  name="em"
                  type="email"
                  rules={[
                    {
                      required: true,
                      message: 'Please input email',
                    },
                  ]}
                />
                <MyTextInput label="First Name" name="fn" />
                <MyTextInput label="Last Name" name="ln" />

                <MySelect
                  label="Role"
                  name="type"
                  rules={[
                    {
                      required: true,
                      message: 'Please select a role',
                    },
                  ]}
                  placeholder="Please select a role"
                >
                  <MySelect.Option value={ROLES.admin}>{t('roles.admin')}</MySelect.Option>
                  <MySelect.Option value={ROLES.assistant}>{t('roles.assistant')}</MySelect.Option>
                  <MySelect.Option value={ROLES.officer}>{t('roles.officer')}</MySelect.Option>
                </MySelect>

                {!isEdit ? (
                  <>
                    <div style={{ textAlign: 'right', marginBottom: '10px' }}>
                      <Button type="default" onClick={onGeneratePassword}>
                        Generate Password
                      </Button>
                    </div>

                    <MyPasswordInput
                      label="Password"
                      name="pwd"
                      rules={[
                        {
                          required: true,
                          message: 'Please input your password!',
                        },
                      ]}
                      hasFeedback
                    />

                    <MyPasswordInput
                      label="Confirm Password"
                      name="confirmPwd"
                      dependencies={['pwd']}
                      hasFeedback
                      rules={[
                        {
                          required: true,
                          message: 'Please confirm your password!',
                        },
                        ({ getFieldValue }) => ({
                          validator(_, value) {
                            if (!value || getFieldValue('pwd') === value) {
                              return Promise.resolve();
                            }

                            return Promise.reject(new Error('The two passwords that you entered do not match!'));
                          },
                        }),
                      ]}
                    />
                  </>
                ) : null}

                {serviceError && <FieldErrorMsg msg={serviceError} />}
              </Card>
            </Col>
          </Row>
        </AppLayoutWithHeader>
      </Form>
    </>
  );
}

export default InternalUserForm;
