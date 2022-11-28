import React, { useEffect, useState } from 'react';
import {
  Divider,
  Form,
  Input,
  message,
  Modal,
  Space,
  Typography,
  Image,
  List,
  Avatar,
  InputNumber,
  notification,
  Spin,
  Select
} from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'antd-button-color';
import authAPI from 'src/api/auth';
import { UserInfo } from 'src/portals/commerce/hooks/AppContext';

const { Title } = Typography;

const UserDetailPage: React.FC = () => {
  const [defaultData, setDefaultData] = useState<UserInfo>(null);

  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchOne = () => {
    authAPI.getOne(id).then((res) => {
      setDefaultData(res);
    });
  };

  useEffect(() => {
    fetchOne();
  }, []);

  const onUpdate = (value: UserInfo) => {
    authAPI.update(id, value).then(() => {
      notification.success({
        message: 'Updated'
      });
      navigate('/admin/user');
    });
  };

  const onRegister = (values) => {
    authAPI.register(values).then(() => {
      navigate('/admin/user');
    });
  };

  const onSubmit = () => {
    form.validateFields().then((values) => {
      id === 'new' ? onRegister(values) : onUpdate(values);
      form.submit();
    });
  };

  if (id !== 'new' && !defaultData) {
    return <Spin />;
  }

  console.log('9999 up', defaultData);

  return (
    <>
      <Title style={{ margin: 0 }}>
        {id === 'new' ? 'Create' : 'Edit'} User
      </Title>
      <Divider />
      <Form
        form={form}
        className="admin-form"
        name="basic"
        layout="vertical"
        initialValues={defaultData}
      >
        <Form.Item
          label="Fullname"
          name="fullname"
          rules={[{ required: true, message: 'Bạn chưa nhập họ tên!' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Phone"
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
          label="Address"
          name="address"
          rules={[{ required: true, message: 'Bạn chưa nhập địa chỉ !' }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          name="role"
          label="Role"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Select
            key={id}
            showSearch
            allowClear
            disabled={id === 'new' ? true : false}
            defaultValue={id === 'new' ? 'customer' : defaultData}
          >
            <Select.Option value="customer" key="customer">
              Customer
            </Select.Option>
            <Select.Option value="staff" key="staff">
              Staff
            </Select.Option>
            <Select.Option value="admin" key="admin">
              Admin
            </Select.Option>
          </Select>
        </Form.Item>
      </Form>
      <Divider />
      <Space>
        <Button type="primary" onClick={onSubmit}>
          Save
        </Button>
        <Button type="danger">
          <Link to="/admin/user">Cancel</Link>
        </Button>
      </Space>
    </>
  );
};

UserDetailPage.displayName = 'UserDetailPage';
export default UserDetailPage;
