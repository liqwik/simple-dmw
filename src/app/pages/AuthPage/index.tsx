import React, { useRef, useEffect } from 'react';
import { LockOutlined, UserOutlined } from '@ant-design/icons';
import {
  Button,
  Input,
  Checkbox,
  Form,
  Alert,
  Row,
  Col,
  Typography,
} from 'antd';
import { Logo } from 'app/components/UI/Icon';
import { useLoginSlice } from './slice';
import { useDispatch, useSelector } from 'react-redux';
import { selectLogin } from './slice/selectors';
import AppRoute from 'utils/AppRoute';
import { AppStorage } from 'utils';
import { LoginFormWrapper } from 'app/components/Wrapper/LoginFormWrapper';
const { Title } = Typography;

export default function LoginPage({ history }) {
  const dispatch = useDispatch();
  const { actions } = useLoginSlice();
  const { user, loading, error } = useSelector(selectLogin);

  const mounted = useRef<any>();

  useEffect(() => {
    if (!mounted.current) {
      mounted.current = true;
    } else {
      // componentDidUpdate
      if (user) {
        AppStorage.setAuthData(user);
        history.replace(AppRoute.dashboard);
      }
    }
  }, [user, history]);

  const handleSubmit = values => {
    dispatch(actions.loginAction(values));
  };

  const handleSubmitFailed = errorInfo => {
    console.log('Failed:', errorInfo);
  };

  return (
    <div style={{ position: 'fixed', height: '100%', width: '100%' }}>
      <Row justify="center" align="middle" style={{ height: '100%' }}>
        <Col span={24}>
          <LoginFormWrapper>
            <Logo center margin="0 auto 16px" width="96px" />
            <Title level={3}>ប្រព័ន្ធគ្រប់គ្រងឯកសារខេត្តកណ្តាល</Title>

            <br />
            {error && (
              <Alert
                style={{ marginBottom: '20px' }}
                message={error}
                type="error"
                showIcon
              />
            )}

            <Form onFinish={handleSubmit} onFinishFailed={handleSubmitFailed}>
              <Form.Item
                name="idtt"
                rules={[{ required: true, message: 'សូមបំពេញឈ្មោះគណនី' }]}
              >
                <Input
                  allowClear
                  autoFocus
                  placeholder="ឈ្មោះគណនី"
                  autoComplete="off"
                  prefix={<UserOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item
                hasFeedback
                name="pwd"
                rules={[
                  { required: true, message: 'សូមបំពេញពាក្យសម្ងាត់' },
                  { min: 6, message: 'ពាក្យសម្ងាត់យ៉ាងតិច ៦ តួអក្សរ' },
                ]}
              >
                <Input.Password
                  placeholder="ពាក្យសម្ងាត់"
                  prefix={<LockOutlined className="site-form-item-icon" />}
                />
              </Form.Item>

              <Form.Item>
                <Form.Item name="remember" valuePropName="checked" noStyle>
                  <Checkbox>ចង់ចាំគណនី</Checkbox>
                </Form.Item>
              </Form.Item>

              <Form.Item>
                <Button
                  loading={loading}
                  type="primary"
                  htmlType="submit"
                  className="login-form-button"
                >
                  ចូលប្រើប្រាស់ប្រព័ន្ធ
                </Button>
              </Form.Item>
            </Form>
          </LoginFormWrapper>
        </Col>
      </Row>
    </div>
  );
}
