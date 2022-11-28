import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Popconfirm,
  Space,
  Table,
  Typography,
  message
} from 'antd';
import Avatar from 'src/components/image/avatar';
import { Link } from 'react-router-dom';
import {
  PlusOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import categoryAPI from 'src/api/category';
import notification, { NotificationPlacement } from 'antd/lib/notification';

const { Title, Text } = Typography;

interface CategoryModel {
  id: string;
  title: string;
  imageUrl: string;
}

const CategoryPage: React.FC = () => {
  const [categories, setCategories] = useState<CategoryModel[]>([]);

  const fetchList = () => {
    categoryAPI.get().then((res) => {
      setCategories(res);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  const onDelete = (item: CategoryModel) => {
    categoryAPI.remove(item.id, item.imageUrl).then(() => {
      notification.open({
        message: 'Deleted',
        icon: <DeleteOutlined style={{ color: 'red' }} />
      });
      fetchList();
    });
  };

  return (
    <>
      <Space
        size="middle"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 20px'
        }}
      >
        <Title style={{ margin: 0 }}>Category</Title>
        <Button type="primary" shape="circle" size="large">
          <Link to="/admin/category/new">
            <PlusOutlined />
          </Link>
        </Button>
      </Space>
      <Divider />
      <Table
        dataSource={categories}
        rowKey="id"
        style={{ padding: '0 55px' }}
        scroll={{ y: 685 }}
      >
        <Table.Column
          title="Logo"
          dataIndex="imageUrl"
          key="logo"
          render={(imageUrl) => <Avatar src={imageUrl} size="default" />}
        />
        <Table.Column
          title="Title"
          dataIndex="title"
          key="title"
          render={(title) => {
            return <Text>{title}</Text>;
          }}
        />
        <Table.Column
          title="Action"
          key="action"
          align="center"
          render={(item) => {
            return (
              <>
                <Button>
                  <Link to={`/admin/category/${item.id}`}>
                    <EditOutlined />
                  </Link>
                </Button>
                <Popconfirm
                  title="Sure to delete?"
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  onConfirm={() => onDelete(item)}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button style={{ marginLeft: 6 }}>
                    <DeleteOutlined style={{ color: 'red' }} />
                  </Button>
                </Popconfirm>
              </>
            );
          }}
        />
      </Table>
    </>
  );
};

CategoryPage.displayName = 'CategoryPage';
export default CategoryPage;
