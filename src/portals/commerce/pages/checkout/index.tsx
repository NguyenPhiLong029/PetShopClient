import {
  Card,
  Col,
  Divider,
  Form,
  Input,
  Radio,
  RadioChangeEvent,
  Row,
  Space,
  Spin,
  Table,
  Typography
} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../hooks/AppContext';
import s from './index.module.scss';
import checkoutAPI from 'src/api/checkout';
import orderAPI from 'src/api/order';
import { formatCurrency } from 'src/utils/func';
import useCart from '../../hooks/useCart';
import { useNavigate } from 'react-router-dom';
import Button from 'antd-button-color';

interface PaymentModel {
  id: string;
  title: string;
}

interface ShipmentModel {
  id: string;
  title: string;
  costPerKg: number;
}

interface OrderModel {
  totalQuantity: number;
  totalAmount: number;
  totalWeight: number;
  totalShipmentAmount: number;
  orderlines: OrderLineModel[];
  paymentId: string;
  shipmentId: string;
  userId?: string;
  fullname?: string;
  phone?: string;
  email?: string;
  address?: string;
}

interface OrderLineModel {
  quantity: number;
  amount: number;
  weight: number;
  variantId: string;
}

const CheckoutPage: React.FC = () => {
  const [payments, setPayments] = useState<PaymentModel[]>([]);
  const [shipments, setShipments] = useState<ShipmentModel[]>([]);

  const { userInfo, cart } = useContext(AppContext);
  const { removeAll } = useCart();

  const [selectedPayment, setSelectedPayment] = useState<PaymentModel>(null);
  const [selectedShipment, setSelectedShipment] = useState<ShipmentModel>(null);

  const [form] = Form.useForm();
  const navigate = useNavigate();

  const fecthCheckout = async () => {
    const [resPayments, resShipments] = await Promise.all([
      checkoutAPI.getPayment(),
      checkoutAPI.getShipment()
    ]);
    setPayments(resPayments);
    setSelectedPayment(resPayments[0]);
    setShipments(resShipments);
    setSelectedShipment(resShipments[0]);
    form.setFieldValue('paymentId', resPayments[0].id);
    form.setFieldValue('shipmentId', resShipments[0].id);
  };

  const onCreate = (values: OrderModel) => {
    const orderlines = cart.items.map((item) => {
      return {
        quantity: item.quantity,
        amount: item.quantity * item.price,
        weight: item.quantity * item.weight,
        variantId: item.id
      };
    });

    const orderDto: OrderModel = {
      totalQuantity: cart.totalQuantity,
      totalAmount: cart.totalAmount,
      totalWeight: cart.totalWeight,
      totalShipmentAmount: Math.round(
        selectedShipment.costPerKg * cart.totalWeight
      ),
      orderlines,
      paymentId: values.paymentId,
      shipmentId: values.shipmentId,

      fullname: values.fullname || userInfo.fullname,
      phone: values.phone || userInfo.phone,
      email: values.email || userInfo.email,
      address: values.address || userInfo.address,
      userId: userInfo.id
    };

    orderAPI.create(orderDto).then((res) => {
      // removeAll();
      navigate('/orderconfirm');
    });
  };

  const onSave = () => {
    form.validateFields().then((values) => {
      onCreate(values);
      form.submit();
      form.resetFields();
    });
  };

  useEffect(() => {
    fecthCheckout();
  }, []);

  if (!selectedPayment || !selectedShipment) {
    return <Spin />;
  }

  const renderGuestForm = () => (
    <Row justify="space-between">
      <Col span={11}>
        <Form.Item
          name="fullname"
          label="H??? v?? t??n"
          rules={[{ required: true }, { whitespace: true }]}
          style={{ fontWeight: '500' }}
          hasFeedback
        >
          <Input className={s['border_input']} bordered={false} />
        </Form.Item>
        <Form.Item
          name="address"
          label="?????a ch???"
          hasFeedback
          rules={[{ required: true }, { whitespace: true }, { min: 10 }]}
          style={{ fontWeight: '500' }}
        >
          <Input className={s.border_input} bordered={false} />
        </Form.Item>
      </Col>
      <Col span={12}>
        <Form.Item
          name="phone"
          label="S??? ??i???n tho???i:"
          style={{ fontWeight: '500' }}
          rules={[{ required: true }, { min: 10 }]}
          hasFeedback
        >
          <Input
            className={s.border_input}
            addonBefore="+84"
            style={{ width: '100%' }}
            bordered={false}
            type="number"
          />
        </Form.Item>
        <Form.Item
          name="email"
          label="Email"
          hasFeedback
          rules={[
            { required: true },
            {
              type: 'email',
              message: 'The input is not valid E-mail!'
            }
          ]}
          style={{ fontWeight: '500' }}
        >
          <Input className={s.border_input} bordered={false} />
        </Form.Item>
      </Col>
    </Row>
  );

  const renderUserInfo = () => (
    <Row>
      <Col span={12}>
        <p>H??? v?? t??n</p>
        <p>Email</p>
        <p>??i???n tho???i</p>
        <p>?????a ch???</p>
      </Col>
      <Col span={12}>
        <p>{userInfo.fullname}</p>
        <p>{userInfo.email}</p>
        <p>{userInfo.phone}</p>
        <p>{userInfo.address}</p>
      </Col>
    </Row>
  );

  return (
    <>
      <div style={{ padding: 32 }}>
        <Typography.Title
          level={2}
          style={{ marginBottom: 32, paddingBottom: 24 }}
        >
          Th??ng tin ????n h??ng
        </Typography.Title>

        <Form form={form} layout="vertical" size="large">
          {userInfo?.id ? renderUserInfo() : renderGuestForm()}

          <Form.Item name="userId" initialValue={userInfo.id} hidden>
            <Input />
          </Form.Item>
          <Divider />

          <Row gutter={50}>
            <Col span={12}>
              <Table
                dataSource={payments}
                pagination={false}
                rowKey="id"
                size="small"
                bordered
              >
                <Table.Column
                  title="Ph????ng th???c thanh to??n"
                  key="payment"
                  render={(item) => (
                    <Form.Item
                      name="paymentId"
                      style={{
                        fontWeight: '500',
                        marginBottom: 0
                      }}
                      rules={[
                        {
                          required: true,
                          message: 'B???n ch??a ch???n Ph????ng th???c thanh to??n'
                        }
                      ]}
                    >
                      <Radio.Group
                        key="payment"
                        defaultValue={selectedPayment.id}
                        onChange={(e) => {
                          const selected = payments.find(
                            (s) => s.id == e.target.value
                          );
                          setSelectedPayment(selected);
                        }}
                      >
                        <Radio
                          style={{ display: 'block', marginBottom: 10 }}
                          value={item.id}
                          key={item.id}
                        >
                          {item.title}
                        </Radio>
                      </Radio.Group>
                    </Form.Item>
                  )}
                />
              </Table>
            </Col>
            <Col span={12}>
              <Table
                dataSource={shipments}
                pagination={false}
                rowKey="id"
                size="small"
                bordered
              >
                <Table.Column
                  title="H??nh th???c v???n chuy???n"
                  key="shipment"
                  render={(record) => {
                    return (
                      <>
                        <Form.Item
                          name="shipmentId"
                          style={{ fontWeight: '500', margin: 0 }}
                          rules={[
                            {
                              required: true,
                              message: 'B???n ch??a ch???n H??nh th???c v???n chuy???n'
                            }
                          ]}
                        >
                          <Radio.Group
                            onChange={(e) => {
                              const selected = shipments.find(
                                (s) => s.id == e.target.value
                              );
                              setSelectedShipment(selected);
                            }}
                            style={{ width: '100%' }}
                            key="shipment"
                            defaultValue={selectedShipment.id}
                          >
                            <Radio
                              style={{ width: '100%' }}
                              value={record.id}
                              key={record.id}
                            >
                              {record.title}
                            </Radio>
                          </Radio.Group>
                        </Form.Item>
                      </>
                    );
                  }}
                />

                <Table.Column
                  title="Gi?? / Kg"
                  key="costPerKg"
                  align="center"
                  render={(record) => {
                    return (
                      <>
                        <Typography.Text
                          style={{ fontWeight: '500', margin: 0 }}
                        >
                          {formatCurrency(record.costPerKg)}
                        </Typography.Text>
                      </>
                    );
                  }}
                />
              </Table>
            </Col>
          </Row>
          <Divider />
          <Card
            hoverable
            style={{
              backgroundColor: '#f2f4f5',
              marginBottom: '30px'
            }}
          >
            <div>
              <Col>
                <Typography.Title level={3}>????n h??ng c???a b???n</Typography.Title>
              </Col>
              <Divider />
              <Space
                direction="vertical"
                size="middle"
                style={{ width: '100%' }}
              >
                <Space direction="vertical" style={{ width: '100%' }}>
                  <Table
                    dataSource={cart?.items}
                    pagination={false}
                    rowKey="id"
                  >
                    <Table.Column
                      title="S???n ph???m"
                      dataIndex="title"
                      key="title"
                    />
                    <Table.Column
                      title="????n gi??"
                      dataIndex="price"
                      key="price"
                      align="right"
                      render={(price) => formatCurrency(price)}
                    />
                    <Table.Column
                      title="Kh???i l?????ng (Kg)"
                      dataIndex="weight"
                      key="weight"
                      align="right"
                    />

                    <Table.Column
                      title="S??? l?????ng"
                      dataIndex="quantity"
                      key="quantity"
                      align="right"
                    />

                    <Table.Column
                      title="T???ng KL (Kg)"
                      key="id"
                      align="right"
                      render={(record) =>
                        Math.round(record.weight * record.quantity * 1000) /
                        1000
                      }
                    />
                    <Table.Column
                      title="T???ng ti???n"
                      key="id"
                      align="right"
                      render={(record) =>
                        formatCurrency(record.price * record.quantity)
                      }
                    />
                  </Table>
                </Space>
              </Space>
              <Divider />
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <Typography.Title
                    level={4}
                    style={{ fontWeight: 'bold', margin: 0 }}
                  >
                    Ti???n h??ng
                  </Typography.Title>

                  <Typography.Text type="secondary">
                    <span>{cart.count + ' s???n ph???m'}</span>
                  </Typography.Text>
                </div>
                <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
                  {formatCurrency(cart.totalAmount)}
                </Typography.Title>
              </Space>
              <Divider />
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography.Title level={5} style={{ fontWeight: 'bold' }}>
                  Ph????ng th???c thanh to??n
                </Typography.Title>
                <div>{selectedPayment.title}</div>
              </Space>
              <Divider />
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <Typography.Title level={5} style={{ fontWeight: 'bold' }}>
                    Th??ng tin giao h??ng
                  </Typography.Title>
                  <p>?????a ch???: {userInfo.address}</p>
                  <p>T???ng kh???i l?????ng: {cart.totalWeight} Kg</p>
                  <p>H??nh th???c v???n chuy???n: {selectedShipment.title}</p>
                  <p>
                    ????n gi?? v???n chuy???n:{' '}
                    {formatCurrency(selectedShipment.costPerKg)} / Kg
                  </p>
                </div>
              </Space>
              <Divider />

              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <Typography.Title
                    level={4}
                    style={{ fontWeight: 'bold', margin: 0 }}
                  >
                    Ph?? v???n chuy???n:
                  </Typography.Title>

                  <Typography.Text type="secondary">
                    <span>
                      {cart.totalWeight} Kg x{' '}
                      {formatCurrency(selectedShipment.costPerKg)}
                    </span>
                  </Typography.Text>
                </div>
                <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
                  {formatCurrency(
                    selectedShipment.costPerKg * cart.totalWeight
                  )}
                </Typography.Title>
              </Space>

              <Divider />
              <Space
                style={{
                  display: 'flex',
                  justifyContent: 'space-between'
                }}
              >
                <Typography.Title level={2} style={{ fontWeight: 'bold' }}>
                  T???ng
                </Typography.Title>
                <Typography.Title level={4} style={{ fontWeight: 'bold' }}>
                  {formatCurrency(
                    cart.totalAmount +
                      selectedShipment?.costPerKg * cart.totalWeight
                  )}
                </Typography.Title>
              </Space>
            </div>
          </Card>
          <Form.Item style={{ textAlign: 'center' }}>
            <Button
              shape="round"
              type="danger"
              block
              style={{
                textTransform: 'uppercase',
                height: 46,
                fontWeight: 'bold',
                maxWidth: 300
              }}
              onClick={onSave}
            >
              ?????t h??ng
            </Button>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

CheckoutPage.displayName = 'CheckoutPage';
export default CheckoutPage;
