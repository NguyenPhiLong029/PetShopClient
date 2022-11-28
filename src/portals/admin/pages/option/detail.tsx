import {
  Divider,
  Form,
  Input,
  message,
  Radio,
  RadioChangeEvent,
  Select,
  Space,
  Spin,
  Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'antd-button-color';
import optionsAPI from 'src/api/option';

interface VariantOpstDetailProps {
  id: string;
  key: number;
  value: string;
}

const VariantOpstDetailPage: React.FC = () => {
  const [defaultData, setDefaultData] = useState<VariantOpstDetailProps>(null);

  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchOne = () => {
    optionsAPI.getOne(id).then((res) => {
      setDefaultData(res);
    });
  };

  useEffect(() => {
    fetchOne();
  }, []);

  const onCreate = (values: VariantOpstDetailProps) => {
    optionsAPI.create(values).then(() => {
      message.success('Created');
      navigate('/admin/option');
    });
  };

  const onUpdate = (value: VariantOpstDetailProps) => {
    optionsAPI.update(id, value).then(() => {
      message.success('Updated');
      navigate('/admin/option');
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
      <Typography.Title style={{ margin: 0 }}>
        {id === 'new' ? 'Create' : 'Edit'} Option
      </Typography.Title>
      <Divider />
      <Form
        form={form}
        layout="vertical"
        className="admin-form"
        initialValues={defaultData}
      >
        <Form.Item
          name="key"
          label="Key"
          hasFeedback
          rules={[{ required: true }, { whitespace: true }, { min: 1 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="value"
          label="Value"
          hasFeedback
          rules={[{ required: true }, { whitespace: true }, { min: 1 }]}
        >
          <Input />
        </Form.Item>
      </Form>

      <Divider />
      <Space>
        <Button type="primary" onClick={onSave}>
          Save
        </Button>
        <Button type="danger">
          <Link to="/admin/option">Cancel</Link>
        </Button>
      </Space>
    </>
  );
};

VariantOpstDetailPage.displayName = 'VariantOpstDetailPage';
export default VariantOpstDetailPage;
