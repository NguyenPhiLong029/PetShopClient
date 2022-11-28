import {
  Button,
  Divider,
  Space,
  Table,
  Typography,
  Popconfirm,
  Tooltip,
  Input,
  notification
} from 'antd';
import Image from 'src/components/image/index';
import React, { useEffect, useState } from 'react';
import {
  PlusOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  DeleteOutlined,
  UnorderedListOutlined,
  SearchOutlined
} from '@ant-design/icons';
import { Link } from 'react-router-dom';
import productAPI from 'src/api/product';

const { Title, Text } = Typography;

type Category = {
  id: string;
  title: string;
};

interface ProductModel {
  id: string;
  title: string;
  description: string;
  imageUrl: string;
  category: Category;
}

const ProductPage: React.FC = () => {
  const [products, setProducts] = useState<ProductModel[]>([]);

  const fetchList = () => {
    productAPI.get().then((data) => {
      setProducts(data);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  const onDelete = (item: ProductModel) => {
    productAPI.remove(item.id, item.imageUrl).then(() => {
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
        <Title style={{ margin: 0 }}>Product</Title>
        <Tooltip title="Create new">
          <Button type="primary" shape="circle" size="large">
            <Link to="/admin/product/new">
              <PlusOutlined />
            </Link>
          </Button>
        </Tooltip>
      </Space>
      <Divider />
      <Table
        dataSource={products}
        rowKey="id"
        style={{ padding: '0 55px' }}
        scroll={{ y: 685 }}
      >
        <Table.Column
          title="Image"
          dataIndex="imageUrl"
          key="imageUrl"
          render={(imageUrl) => {
            return (
              <>
                <Image src={imageUrl} width={80} />
              </>
            );
          }}
        />
        <Table.Column
          title="Title"
          dataIndex="title"
          key="title"
          render={(title) => {
            return (
              <>
                <Text>{title}</Text>
              </>
            );
          }}
          filterDropdown={({ setSelectedKeys, selectedKeys, confirm }) => {
            return (
              <>
                <div style={{ display: 'flex' }}>
                  <Input
                    autoFocus
                    allowClear
                    placeholder="Search here"
                    value={selectedKeys[0]}
                    onChange={(e) => {
                      setSelectedKeys(e.target.value ? [e.target.value] : []);
                      confirm({ closeDropdown: false });
                    }}
                    onPressEnter={() => {
                      confirm();
                    }}
                    onBlur={() => {
                      confirm();
                    }}
                  />
                  <Button
                    onClick={() => {
                      confirm();
                    }}
                    type="primary"
                  >
                    <SearchOutlined />
                  </Button>
                </div>
              </>
            );
          }}
          filterIcon={() => {
            return <SearchOutlined />;
          }}
          onFilter={(value, record: ProductModel) => {
            return record.title.toLowerCase().includes(value.toLocaleString());
          }}
        />
        <Table.Column
          title="Description"
          dataIndex="description"
          key="description"
          render={(description) => {
            return (
              <>
                <Text ellipsis={true}>{description}</Text>
              </>
            );
          }}
        />
        <Table.Column
          title="Category"
          dataIndex="category"
          key="category"
          render={(_, record: ProductModel) => {
            return (
              <>
                <Text>{record.category.title}</Text>
              </>
            );
          }}
          filters={[
            { text: 'Shop Meo', value: 'Shop Meo' },
            { text: 'Shop Cún', value: 'Shop Cun' }
          ]}
          onFilter={(value, record: ProductModel) =>
            record.category.title.toString() === value
          }
        />

        <Table.Column
          title="Action"
          key="action"
          align="center"
          render={(item) => {
            return (
              <>
                <Tooltip title="Variants">
                  <Button>
                    <Link to={`/admin/product/${item.id}/variants`}>
                      <UnorderedListOutlined />
                    </Link>
                  </Button>
                </Tooltip>
                <Tooltip title="Edit">
                  <Button style={{ marginLeft: 6 }}>
                    <Link to={`/admin/product/${item.id}`}>
                      <EditOutlined />
                    </Link>
                  </Button>
                </Tooltip>
                <Popconfirm
                  title="Sure to delete?"
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  onConfirm={() => {
                    onDelete(item);
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip title="Delete">
                    <Button style={{ marginLeft: 6 }}>
                      <DeleteOutlined style={{ color: 'red' }} />
                    </Button>
                  </Tooltip>
                </Popconfirm>
              </>
            );
          }}
        />
      </Table>
    </>
  );
};

ProductPage.displayName = 'ProductPage';
export default ProductPage;
