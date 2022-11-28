import {
  Button,
  Divider,
  notification,
  Space,
  Table,
  Tag,
  Tooltip,
  Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import { PlusOutlined, DeleteOutlined, EyeOutlined } from '@ant-design/icons';
import { Link } from 'react-router-dom';
import orderAPI from 'src/api/order';
import { formatCurrency, formatWeightKg } from 'src/utils/func';

interface OrderModel {
  id: string;
  totalQuantity: number;
  totalAmount: number;
  totalWeight: number;
  orderlines: OrderLineModel[];
  payment: PaymentModel;
  shipment: ShipmentModel;
  userId?: UserModel;
}

interface OrderLineModel {
  quantity: number;
  amount: number;
  weight: number;
  variant: VariantModel[];
  orderId: string;
}

interface VariantModel {
  id: string;
  title: string;
  sku: string;
  stock: number;
  price: number;
  weight: number;
  imageUrl: string;
}

interface PaymentModel {
  id: string;
  title: string;
}

interface ShipmentModel {
  id: string;
  title: string;
}

interface UserModel {
  id: string;
  title: string;
}

const OrdersPage: React.FC = () => {
  const [orders, setOrders] = useState<OrderModel[]>([]);

  const fetchList = () => {
    orderAPI.get().then((res) => {
      setOrders(res);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

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
        <Typography.Title>Order</Typography.Title>
        <Button
          type="primary"
          shape="circle"
          size="large"
          style={{ marginBottom: 15 }}
        >
          <Link to={'/admin/option/new'}>
            <PlusOutlined />
          </Link>
        </Button>
      </Space>
      <Divider />
      <Table
        dataSource={orders}
        rowKey="id"
        style={{ padding: '0 55px' }}
        scroll={{ y: 685 }}
      >
        <Table.Column
          title="Total Quantity"
          dataIndex="totalQuantity"
          key="totalQuantity"
          render={(totalQuantity) => {
            return (
              <>
                <Typography.Text>{totalQuantity}</Typography.Text>
              </>
            );
          }}
        />
        <Table.Column
          title="Total Amount"
          dataIndex="totalAmount"
          key="totalAmount"
          render={(totalAmount) => {
            return (
              <>
                <Typography.Text>{formatCurrency(totalAmount)}</Typography.Text>
              </>
            );
          }}
        />
        <Table.Column
          title="Total Weight"
          dataIndex="totalWeight"
          key="totalWeight"
          render={(totalWeight) => formatWeightKg(totalWeight)}
        />

        <Table.Column title="SĐT" dataIndex="phone" key="phone" />

        <Table.Column
          title="Shipment"
          dataIndex="shipment"
          key="shipment"
          render={(shipment) => {
            return (
              <>
                <Typography.Text>{shipment.title}</Typography.Text>
              </>
            );
          }}
        />
        <Table.Column
          title="Status"
          dataIndex="status"
          key="status"
          render={(status) => <Tag>{status}</Tag>}
        />
        <Table.Column
          dataIndex="id"
          key="action"
          align="center"
          render={(id) => (
            <Button>
              <Link to={`/admin/order/${id}`}>
                <EyeOutlined />
              </Link>
            </Button>
          )}
        />
      </Table>
    </>
  );
};

OrdersPage.displayName = 'OrdersPage';
export default OrdersPage;
