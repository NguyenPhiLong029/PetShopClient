import {
  Button,
  Divider,
  Space,
  Table,
  Typography,
  Popconfirm,
  Tooltip,
  notification
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import variantAPI from 'src/api/variant';
import Image from 'src/components/image/index';
import { NotificationPlacement } from 'antd/lib/notification';
import { formatCurrency } from 'src/utils/func';

interface VariantModel {
  id: string;
  title: string;
  sku: string;
  stock: number;
  price: number;
  weight: number;
  imageUrl: string;
  product: {
    id: string;
  };
}

const Variants: React.FC = () => {
  const [variants, setVariants] = useState<VariantModel[]>([]);

  const { id } = useParams();

  const fetchListBy = () => {
    variantAPI.getByProduct(id).then((data) => {
      setVariants(data);
    });
  };

  useEffect(() => {
    fetchListBy();
  }, []);

  const onDelete = (item: VariantModel) => {
    variantAPI.remove(item.id, item.imageUrl).then(() => {
      notification.open({
        message: 'Deleted',
        icon: <DeleteOutlined style={{ color: 'red' }} />
      });
      fetchListBy();
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
        <Typography.Title level={5}>Product ID: {id}</Typography.Title>
        <Tooltip title="Create new">
          <Button
            type="primary"
            shape="circle"
            size="large"
            style={{ marginBottom: 15 }}
          >
            <Link to={`/admin/product/${id}/variants/new`}>
              <PlusOutlined />
            </Link>
          </Button>
        </Tooltip>
      </Space>
      <Divider />
      <Table
        dataSource={variants}
        rowKey="id"
        pagination={false}
        style={{ padding: '0 55px' }}
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
                <Typography.Text>{title}</Typography.Text>
              </>
            );
          }}
        />
        <Table.Column
          title="Sku"
          dataIndex="sku"
          key="sku"
          render={(sku) => {
            return (
              <>
                <Typography.Text>{sku}</Typography.Text>
              </>
            );
          }}
        />
        <Table.Column
          title="Stock"
          dataIndex="stock"
          key="stock"
          render={(stock) => {
            return (
              <>
                <Typography.Text>{stock}</Typography.Text>
              </>
            );
          }}
        />
        <Table.Column
          title="Price"
          dataIndex="price"
          key="price"
          render={(price) => {
            return (
              <>
                <Typography.Text>{formatCurrency(price)}</Typography.Text>
              </>
            );
          }}
        />
        <Table.Column
          title="Weight"
          dataIndex="weight"
          key="weight"
          render={(weight) => {
            return (
              <>
                <Typography.Text>{weight}</Typography.Text>
                <span style={{ marginLeft: 3 }}>Kg</span>
              </>
            );
          }}
        />
        <Table.Column
          title="Action"
          key="action"
          align="center"
          render={(item) => {
            return (
              <>
                <Tooltip title="Edit">
                  <Button style={{ marginLeft: 6 }}>
                    <Link to={`/admin/product/${id}/variants/${item.id}`}>
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

Variants.displayName = 'Variants';
export default Variants;
