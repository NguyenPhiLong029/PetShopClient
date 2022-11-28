import {
  Divider,
  Form,
  Input,
  notification,
  Select,
  Space,
  Spin,
  Tooltip,
  Typography
} from 'antd';
import Button from 'antd-button-color';
import React, { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import productAPI from 'src/api/product';
import categoryAPI from 'src/api/category';
import Uploader from 'src/components/uploader';

const { Title } = Typography;
const { TextArea } = Input;
const { Option } = Select;

interface FormModel {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  categoryId: string;
}

interface CategoryModel {
  id: string;
  title: string;
}

const ProductDetailPage: React.FC = () => {
  const [defaultData, setDefaultData] = useState<FormModel>(null);
  const [selectedCategory, setSelectedCategory] = useState<CategoryModel[]>([]);

  const { id } = useParams();
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fetchOne = () => {
    productAPI.getOne(id).then((res) => {
      setDefaultData({
        ...res,
        categoryId: res.category?.id
      });
    });
  };

  const fetchCategories = () => {
    categoryAPI.get().then((res) => {
      setSelectedCategory(res);
    });
  };

  useEffect(() => {
    if (id !== 'new') {
      fetchOne();
    }
    fetchCategories();
  }, []);

  const onCreate = (values: any) => {
    productAPI.create(values).then(() => {
      notification.success({
        message: 'Created'
      });
      navigate('/admin/product');
    });
  };

  const onUpdate = (values: any) => {
    if (values.image && defaultData) {
      values.imageUrl = defaultData.imageUrl;
    }
    productAPI.update(id, values).then(() => {
      notification.success({
        message: 'Updated'
      });
      navigate('/admin/product');
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
        {id === 'new' ? 'Create' : 'Edit'} Product
      </Title>
      <Divider />
      <Form
        form={form}
        layout="vertical"
        className="form-content admin-form"
        initialValues={defaultData}
      >
        <Form.Item name="image" label="Image">
          <Uploader defaultImage={defaultData?.imageUrl} />
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
          name="description"
          label="Description"
          hasFeedback
          rules={[{ required: true }, { whitespace: true }, { min: 5 }]}
        >
          <TextArea allowClear showCount maxLength={2500} />
        </Form.Item>
        <Form.Item
          name="categoryId"
          label="Category"
          hasFeedback
          rules={[{ required: true }]}
        >
          <Select key={id} allowClear>
            {selectedCategory.map((category) => (
              <Option value={category.id}>{category.title}</Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
      <Divider />
      <Space>
        <Tooltip title="Save">
          <Button type="primary" onClick={onSave}>
            Save
          </Button>
        </Tooltip>

        <Tooltip title="Cancel">
          <Button type="danger">
            <Link to="/admin/product">Cancel</Link>
          </Button>
        </Tooltip>
      </Space>
    </>
  );
};

ProductDetailPage.displayName = 'ProductDetailPage';
export default ProductDetailPage;
