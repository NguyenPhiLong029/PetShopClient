import {
  Form,
  Input,
  Space,
  message,
  InputNumber,
  Tooltip,
  Typography,
  Divider,
  Spin,
  Select,
  notification,
  TreeSelect
} from 'antd';
import Avatar from 'src/components/image/avatar';
import React, { useEffect, useState } from 'react';
import variantAPI from 'src/api/variant';
import optionAPI from 'src/api/option';
import Button from 'antd-button-color';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Uploader from 'src/components/uploader';

interface FormModel {
  id: string;
  title: string;
  sku: string;
  stock: number;
  price: number;
  weight: number;
  imageUrl: string;
  option1Id: string;
  option2Id: string;
  option3Id: string;
}

interface OptionModel {
  id: string;
  key: string;
  value: string;
}

const VariantDetail: React.FC = () => {
  const [defaultData, setDefaultData] = useState<FormModel>(null);
  const [options, setOptions] = useState<OptionModel[]>([]);

  const [form] = Form.useForm();
  const { id, vid } = useParams();
  const navigate = useNavigate();

  const fetchOptions = () => {
    optionAPI.get().then((res) => {
      setOptions(res);
    });
  };

  const fetchOne = () => {
    variantAPI.getOne(vid).then((res) => {
      setDefaultData({
        ...res,
        option1Id: res.option_1?.id,
        option2Id: res.option_2?.id,
        option3Id: res.option_3?.id
      });
    });
  };

  useEffect(() => {
    if (vid !== 'new') {
      fetchOne();
    }
    fetchOptions();
  }, []);

  const onSave = () => {
    form.validateFields().then((values) => {
      vid === 'new' ? onCreate(values) : onUpdate(values);
      form.submit();
      form.resetFields();
    });
  };

  const onCreate = (values: any) => {
    variantAPI.create(values).then(() => {
      notification.success({
        message: 'Created'
      });
      navigate(`/admin/product/${id}/variants`);
    });
  };

  const onUpdate = (values: any) => {
    variantAPI.update(vid, values).then(() => {
      if (values.image && defaultData) {
        values.imageUrl = defaultData.imageUrl;
      }
      notification.success({
        message: 'Updated'
      });
      navigate(`/admin/product/${id}/variants`);
    });
  };

  if (vid !== 'new' && !defaultData) {
    return <Spin />;
  }

  return (
    <>
      <Typography.Title style={{ margin: 0 }}>
        {vid === 'new' ? 'Create' : 'Edit'} Variant
      </Typography.Title>
      <Divider />
      <Form
        form={form}
        layout="vertical"
        initialValues={defaultData}
        className="admin-form"
      >
        <Form.Item name="image" label="Image">
          <Uploader defaultImage={defaultData?.imageUrl} />
        </Form.Item>
        <Form.Item
          name="option1Id"
          label="Option 1(Size or Weight or Color)"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Select key={vid} showSearch allowClear>
            {options.map((op) => (
              <Select.Option value={op.id} key={op.id}>
                {op.key} - {op.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="option2Id"
          label="Option 2(Color or Taste)"
          hasFeedback
        >
          <Select key={vid} allowClear showSearch>
            {options.map((op) => (
              <Select.Option value={op.id} key={op.id}>
                {op.key} - {op.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item name="option3Id" label="Option 3(Material)" hasFeedback>
          <Select key={vid} allowClear>
            {options.map((op) => (
              <Select.Option value={op.id} key={op.id}>
                {op.key} - {op.value}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
        <Form.Item
          name="title"
          label="Title"
          hasFeedback
          rules={[{ required: true }, { whitespace: true }, { min: 5 }]}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="sku"
          label="Sku"
          hasFeedback
          rules={[
            { required: true },
            { whitespace: true },
            { min: 10 },
            { max: 10 }
          ]}
          style={{ width: 300 }}
        >
          <Input allowClear />
        </Form.Item>
        <Form.Item
          name="stock"
          label="Stock"
          hasFeedback
          rules={[{ required: true }, { type: 'number' }]}
        >
          <InputNumber style={{ width: 200 }} />
        </Form.Item>
        <Form.Item
          name="price"
          label="Price"
          hasFeedback
          rules={[{ required: true }, { type: 'number' }]}
        >
          <InputNumber style={{ width: 200 }} />
        </Form.Item>
        <Form.Item
          name="weight"
          label="Weight"
          hasFeedback
          rules={[{ required: true }, { type: 'number' }]}
        >
          <InputNumber style={{ width: 200 }} addonAfter="Kg" />
        </Form.Item>
        <Form.Item name="productId" initialValue={id} hidden>
          <Input />
        </Form.Item>
      </Form>
      <Divider />
      <Space style={{ marginBottom: 24 }}>
        <Tooltip title="Save">
          <Button type="primary" onClick={onSave}>
            Save
          </Button>
        </Tooltip>

        <Tooltip title="Cancel">
          <Button type="danger">
            <Link to={`/admin/product/${id}/variants`}>Cancel</Link>
          </Button>
        </Tooltip>
      </Space>
    </>
  );
};

VariantDetail.displayName = 'VariantDetail';
export default VariantDetail;
