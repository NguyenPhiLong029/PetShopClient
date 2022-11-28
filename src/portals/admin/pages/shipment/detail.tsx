import React, { useEffect, useState } from 'react';
import {
  Divider,
  Form,
  Input,
  Space,
  Typography,
  Spin,
  InputNumber,
  notification
} from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'antd-button-color';
import shipmentAPI from 'src/api/shipment';

interface ShipmentProps {
  id: string;
  title: string;
  costPerKg: number;
}

const ShipmentDetailPage: React.FC = () => {
  const [defaultData, setDefaultData] = useState<ShipmentProps>(null);

  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const fecthOne = () => {
    shipmentAPI.getOne(id).then((res) => {
      setDefaultData(res);
    });
  };

  useEffect(() => {
    if (id !== 'new') {
      fecthOne();
    }
  }, []);

  const onSave = () => {
    form.validateFields().then((values) => {
      id === 'new' ? onCreate(values) : onUpdate(values);
      form.submit();
      form.resetFields();
    });
  };

  const onCreate = (values: ShipmentProps) => {
    shipmentAPI.create(values).then(() => {
      notification.success({
        message: 'Created'
      });
      navigate('/admin/shipment');
    });
  };

  const onUpdate = (values: ShipmentProps) => {
    shipmentAPI.update(id, values).then(() => {
      notification.success({
        message: 'Updated'
      });
      navigate('/admin/shipment');
    });
  };

  if (id !== 'new' && !defaultData) {
    return <Spin />;
  }

  return (
    <>
      <Typography.Title style={{ margin: 0 }}>
        {id === 'new' ? 'Create' : 'Edit'} Shipment
      </Typography.Title>
      <Divider />
      <Form
        form={form}
        layout="vertical"
        className="admin-form"
        initialValues={defaultData}
      >
        <Form.Item
          name="title"
          label="Tên"
          hasFeedback
          rules={[{ required: true }, { whitespace: true }, { min: 5 }]}
        >
          <Input />
        </Form.Item>
        <Form.Item
          name="costPerKg"
          label="Giá trên KG"
          hasFeedback
          rules={[{ required: true }, { type: 'number' }]}
        >
          <InputNumber />
        </Form.Item>
      </Form>

      <Divider />
      <Space>
        <Button type="primary" onClick={onSave}>
          Save
        </Button>
        <Button type="danger">
          <Link to="/admin/shipment">Cancel</Link>
        </Button>
      </Space>
    </>
  );
};

ShipmentDetailPage.displayName = 'ShipmentDetailPage';
export default ShipmentDetailPage;
