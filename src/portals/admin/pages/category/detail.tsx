import React, { useEffect, useState } from 'react';
import {
  Divider,
  Form,
  Input,
  Space,
  Typography,
  Spin,
  notification
} from 'antd';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Button from 'antd-button-color';
import categoryAPI from 'src/api/category';
import Uploader from 'src/components/uploader';

interface CategoryModal {
  id: string;
  title: string;
  imageUrl: string;
}

const CategoryDetailPage: React.FC = () => {
  const [defaultData, setDefaultData] = useState<CategoryModal>(null);
  const [form] = Form.useForm();
  const { id } = useParams();
  const navigate = useNavigate();

  const fecthOne = () => {
    categoryAPI.getOne(id).then((res) => {
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
    });
  };

  const onCreate = (values: any) => {
    categoryAPI.create(values).then(() => {
      notification.success({
        message: 'Created'
      });
      navigate('/admin/category');
    });
  };

  const onUpdate = (values: any) => {
    if (values.image && defaultData) {
      values.imageUrl = defaultData.imageUrl;
    }
    categoryAPI.update(id, values).then(() => {
      notification.success({
        message: 'Updated'
      });
      navigate('/admin/category');
    });
  };

  if (id !== 'new' && !defaultData) {
    return <Spin />;
  }

  return (
    <>
      <Typography.Title style={{ margin: 0 }}>
        {id === 'new' ? 'Create' : 'Edit'} Category
      </Typography.Title>
      <Divider />
      <Form
        form={form}
        layout="vertical"
        className="admin-form"
        initialValues={defaultData}
      >
        <Form.Item name="image" label="Logo">
          <Uploader defaultImage={defaultData?.imageUrl} />
        </Form.Item>
        <Form.Item
          label="Title"
          name="title"
          hasFeedback
          rules={[{ required: true }, { whitespace: true }, { min: 3 }]}
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
          <Link to="/admin/category">Cancel</Link>
        </Button>
      </Space>
    </>
  );
};

CategoryDetailPage.displayName = 'CategoryDetailPage';
export default CategoryDetailPage;
