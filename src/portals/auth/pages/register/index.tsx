import { Button, Divider, Form, Input, Select, Typography } from 'antd';
import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import authAPI from 'src/api/auth';

const { Title } = Typography;

const RegisterPage: React.FC = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const onSubmit = () => {
    form.validateFields().then(() => {
      form.submit();
    });
  };

  const onFinish = (values) => {
    authAPI.register(values).then(() => {
      navigate('/auth/login');
    });
  };

  return (
    <div className="auth-page">
      <Title level={2}>Register</Title>
      <Form
        form={form}
        name="basic"
        initialValues={{ remember: true }}
        onFinish={onFinish}
      >
        <Form.Item
          label="Họ tên"
          name="fullname"
          rules={[{ required: true, message: 'Bạn chưa nhập họ tên!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Điện thoại"
          name="phone"
          rules={[{ required: true, message: 'Bạn chưa nhập số điện thoại!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="email"
          label="E-mail"
          rules={[
            {
              type: 'email',
              message: 'Sai định dạng E-mail!'
            },
            {
              required: true,
              message: 'Bạn chưa nhập E-mail!'
            }
          ]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Địa chỉ"
          name="address"
          rules={[{ required: true, message: 'Bạn chưa nhập địa chỉ !' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="password"
          label="Mật khẩu"
          rules={[
            {
              required: true,
              message: 'Bạn chưa nhập mật khẩu!'
            },
            { min: 6 }
          ]}
          hasFeedback
        >
          <Input.Password />
        </Form.Item>

        <Form.Item
          name="confirm"
          label="Xác nhận mật khẩu"
          dependencies={['password']}
          hasFeedback
          rules={[
            {
              required: true,
              message: 'Bạn chưa xác nhận mật khẩu!'
            },
            ({ getFieldValue }) => ({
              validator(_, value) {
                if (!value || getFieldValue('password') === value) {
                  return Promise.resolve();
                }
                return Promise.reject(
                  new Error('Xác nhận mật khẩu chưa chính xác!')
                );
              }
            })
          ]}
        >
          <Input.Password />
        </Form.Item>
      </Form>
      <Divider />
      <div className="auth-page__actions">
        <Button type="default">
          <Link to="/auth/login">Tới trang Đăng nhập</Link>
        </Button>
        <Button type="primary" onClick={onSubmit}>
          Đăng ký
        </Button>
      </div>
    </div>
  );
};

RegisterPage.displayName = 'RegisterPage';
export default RegisterPage;
