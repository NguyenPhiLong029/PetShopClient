import {
  Button,
  Col,
  Divider,
  Row,
  Space,
  Spin,
  Table,
  Tag,
  Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import orderAPI from 'src/api/order';
import { formatCurrency, formatWeightKg } from 'src/utils/func';
import Image from 'src/components/image/index';
import { OrderStatus } from 'src/utils/constant';

const OrderDetailPage: React.FC = () => {
  const [order, setOrder] = useState<any>(null);
  const { id } = useParams();

  const fetchOrder = () => orderAPI.getById(id).then((res) => setOrder(res));

  useEffect(() => {
    fetchOrder();
  }, []);

  if (!order) {
    return <Spin />;
  }

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
        <Typography.Title>Chi tiết đơn hàng</Typography.Title>
      </Space>
      <Divider />
      <Row>
        <Col span={12}>
          <p>Mã đơn hàng</p>
          <p>Tên khách hàng</p>
          <p>Email</p>
          <p>Điện thoại</p>
          <p>Địa chỉ</p>
        </Col>
        <Col span={12}>
          <p>
            <b>{order.id}</b>
          </p>
          <p>{order.fullname}</p>
          <p>{order.email}</p>
          <p>{order.phone}</p>
          <p>{order.address}</p>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}>
          <p>Phương thức thanh toán </p>
        </Col>
        <Col span={12}>
          <p>{order.payment?.title}</p>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={8}>
          <p>Hình thức vận chuyển </p>
        </Col>
        <Col span={8}>
          <p>{order.shipment?.title}</p>
        </Col>
        <Col span={8}>
          <p>{formatCurrency(order.shipment?.costPerKg)} / Kg</p>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}>
          <p> Tổng khối lượng</p>
        </Col>
        <Col span={12}>
          <p>{formatWeightKg(order.totalWeight)}</p>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}>
          <p>Trạng thái đơn hàng </p>
        </Col>
        <Col span={12}>
          <p>
            <Tag>{order.status}</Tag>
          </p>
        </Col>
      </Row>
      <Divider />
      <Table dataSource={order.orderlines} rowKey="id" pagination={false}>
        <Table.Column
          title="Hình SP"
          dataIndex="variant"
          key="variant_image"
          render={(variant) => <Image src={variant.imageUrl} width={70} />}
        />
        <Table.Column
          title="Tên SP"
          dataIndex="variant"
          key="variant_title"
          render={(variant) => variant.title}
        />
        <Table.Column
          title="Khối lượng (Kg)"
          dataIndex="variant"
          key="variant_weight"
          render={(variant) => variant.weight}
        />
        <Table.Column
          title="Đơn giá"
          dataIndex="variant"
          key="variant_price"
          render={(variant) => formatCurrency(variant.price)}
        />
        <Table.Column
          title="Số lượng mua"
          dataIndex="quantity"
          key="quantity"
        />
        <Table.Column
          title="Tổng khối lượng (Kg)"
          dataIndex="weight"
          key="weight"
        />
        <Table.Column
          title="Tổng giá"
          dataIndex="amount"
          key="amount"
          render={(amount) => formatCurrency(amount)}
        />
      </Table>
      <Divider />
      <Row>
        <Col span={8}>
          <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
            Tiền hàng
          </Typography.Title>
        </Col>
        <Col span={8}>
          <p>{order.totalQuantity} đơn vị sản phẩm</p>
        </Col>
        <Col span={8}>
          <Typography.Title
            level={4}
            style={{ fontWeight: 'bold', textAlign: 'right' }}
          >
            {formatCurrency(order.totalAmount)}
          </Typography.Title>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={8}>
          <Typography.Title level={5} style={{ fontWeight: 'bold' }}>
            Phí vận chuyển
          </Typography.Title>
        </Col>
        <Col span={8}>
          <p>
            {formatWeightKg(order.totalWeight)} x{' '}
            {formatCurrency(order.shipment?.costPerKg)} / Kg
          </p>
        </Col>
        <Col span={8}>
          <Typography.Title
            level={5}
            style={{ fontWeight: 'bold', textAlign: 'right' }}
          >
            {formatCurrency(order.totalShipmentAmount)}
          </Typography.Title>
        </Col>
      </Row>
      <Divider />
      <Row>
        <Col span={12}>
          <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
            Trị giá đơn hàng
          </Typography.Title>
        </Col>
        <Col span={12}>
          <Typography.Title
            level={4}
            style={{ fontWeight: 'bold', textAlign: 'right' }}
          >
            {formatCurrency(order.totalAmount + order.totalShipmentAmount)}
          </Typography.Title>
        </Col>
      </Row>
      <Divider />
      <Space style={{ justifyContent: 'flex-end', width: '100%' }}>
        <Button
          type="primary"
          size="large"
          style={{ backgroundColor: 'green' }}
          onClick={() => {
            orderAPI.done(order.id).then(fetchOrder);
          }}
          disabled={order.status === OrderStatus.Done}
        >
          Hoàn thành
        </Button>
        <Button
          type="primary"
          size="large"
          onClick={() => {
            orderAPI.deliver(order.id).then(fetchOrder);
          }}
          disabled={order.status === OrderStatus.InDelivery}
        >
          Đang vận chuyển
        </Button>
        <Button
          type="primary"
          size="large"
          danger
          onClick={() => {
            orderAPI.cancel(order.id).then(fetchOrder);
          }}
          disabled={order.status === OrderStatus.Cancel}
        >
          Huỷ đơn
        </Button>
      </Space>
    </>
  );
};

OrderDetailPage.displayName = 'OrderDetailPage';
export default OrderDetailPage;
