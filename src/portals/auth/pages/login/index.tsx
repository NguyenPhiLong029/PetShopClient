import { Button, Checkbox, Divider, Form, Input, Typography } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authAPI from 'src/api/auth';
import { setToken, setUserInfo } from 'src/utils/auth';

const { Title } = Typography;

const LoginPage: React.FC = () => {
  const [form] = Form.useForm();

  const navigate = useNavigate();

  const onSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  const onFinish = (values) => {
    authAPI.login(values).then((res) => {
      const { access_token, ...user } = res;
      setToken(access_token);
      setUserInfo(user);
      window.location.href = '/';
    });
  };

  return (
    <div className="auth-page">
      <Title level={2}>Login</Title>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="E-mail"
          name="email"
          rules={[
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            },
            { required: true, message: 'Please input your email!' }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Password"
          name="password"
          rules={[{ required: true, message: 'Please input your password!' }]}
        >
          <Input.Password />
        </Form.Item>

        <Form.Item name="remember" valuePropName="checked">
          <Checkbox>Remember me</Checkbox>
        </Form.Item>
      </Form>
      <Divider />
      <div className="auth-page__actions">
        <Button type="default">
          <Link to="/auth/register">Create new account?</Link>
        </Button>
        <Button type="primary" onClick={onSubmit}>
          Submit
        </Button>
      </div>
    </div>
  );
};

LoginPage.displayName = 'LoginPage';
export default LoginPage;
