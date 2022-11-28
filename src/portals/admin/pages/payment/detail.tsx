import {
  Divider,
  Form,
  Input,
  notification,
  Space,
  Spin,
  Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'antd-button-color';
import paymentAPI from 'src/api/payment';

const { Title } = Typography;

interface PaymentModel {
  id: string;
  title: string;
}

const PaymentDetailPage: React.FC = () => {
  const [defaultData, setDefaultData] = useState<PaymentModel>(null);

  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchOne = () => {
    paymentAPI.getOne(id).then((res) => {
      setDefaultData(res);
    });
  };

  useEffect(() => {
    if (id !== 'new') {
      fetchOne();
    }
  }, []);

  const onCreate = (values: any) => {
    paymentAPI.create(values).then(() => {
      notification.success({
        message: 'Created'
      });
      navigate('/admin/payment');
    });
  };

  const onUpdate = (value: any) => {
    paymentAPI.update(id, value).then(() => {
      notification.success({
        message: 'Updated'
      });
      navigate('/admin/payment');
    });
  };

  const onSave = () => {
    form.validateFields().then((values) => {
      id === 'new' ? onCreate(values) : onUpdate(values);
      form.submit();
      form.resetFields();
    });
  };

  if (id !== 'new' && !defaultData) {
    return <Spin />;
  }

  return (
    <>
      <Title style={{ margin: 0 }}>
        {id === 'new' ? 'Create' : 'Edit'} Payment
      </Title>
      <Divider />
      <Form form={form} layout="vertical" initialValues={defaultData}>
        <Form.Item
          name="title"
          label="Title"
          style={{ width: '50%' }}
          hasFeedback
          rules={[{ required: true }, { whitespace: true }, { min: 5 }]}
        >
          <Input allowClear />
        </Form.Item>

        <Divider />
        <Space>
          <Form.Item shouldUpdate>
            <Button type="primary" onClick={onSave}>
              Save
            </Button>
          </Form.Item>
          <Form.Item>
            <Button type="danger">
              <Link to="/admin/payment">Cancel</Link>
            </Button>
          </Form.Item>
        </Space>
      </Form>
    </>
  );
};

PaymentDetailPage.displayName = 'PaymentDetailPage';
export default PaymentDetailPage;
