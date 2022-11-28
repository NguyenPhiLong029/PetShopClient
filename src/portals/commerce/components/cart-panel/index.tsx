import {
  Card,
  Col,
  Divider,
  Drawer,
  Empty,
  Input,
  List,
  message,
  notification,
  Row,
  Space,
  Typography
} from 'antd';
import Image from 'src/components/image/index';
import Button from 'antd-button-color';
import React, { useContext, useEffect, useState } from 'react';
import { CloseOutlined, MinusOutlined, PlusOutlined } from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import s from './index.module.scss';
import useCart, { CartItem } from '../../hooks/useCart';
import { formatCurrency } from 'src/utils/func';
import AppContext from '../../hooks/AppContext';
import VirtualList from 'rc-virtual-list';

interface CartPaneltProps {
  open: boolean;
  closeCart: () => void;
}

const CartPanel: React.FC<CartPaneltProps> = ({ open, closeCart }) => {
  const { removeItem, updateQuantity } = useCart();
  const { cart } = useContext(AppContext);
  const navigate = useNavigate();

  const ContainerCartItemHeight = 693;
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerCartItemHeight
    ) {
      cart.items;
    }
  };

  const onQuantityChange = (item: CartItem, quantity: number) => {
    if (isNaN(quantity)) {
      message.warning('Bạn chưa nhập số lượng');
      return;
    }
    if (quantity > item.stock) {
      message.warning('Vượt quá số lượng trong kho');
      return;
    }
    updateQuantity(item.id, quantity);
  };

  return (
    <>
      <Drawer
        title={cart?.count > 0 ? 'Giỏ hàng(' + cart.count + ')' : 'Giỏ hàng(0)'}
        placement="right"
        onClose={closeCart}
        closable={false}
        open={open}
        width={450}
        extra={
          <Button type="text" onClick={closeCart} style={{ fontSize: 16 }}>
            <CloseOutlined />
          </Button>
        }
      >
        <div
          style={{
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            height: '100%'
          }}
        >
          <Space
            direction="vertical"
            size="middle"
            style={{
              display: 'flex',
              height: 693,
              overflow: 'auto',
              justifyContent: 'center'
            }}
          >
            {cart.items?.length ? (
              <List>
                <VirtualList
                  data={cart.items}
                  height={ContainerCartItemHeight}
                  itemHeight={47}
                  itemKey="id"
                  onScroll={onScroll}
                >
                  {(item) => (
                    <List.Item>
                      <Card key={item.id}>
                        <Space
                          direction="horizontal"
                          size="middle"
                          style={{ display: 'flex' }}
                        >
                          <Image
                            src={item.imageUrl}
                            preview={false}
                            width={95}
                            style={{ borderRadius: 5 }}
                          />
                          <Space
                            direction="vertical"
                            size="small"
                            style={{ display: 'flex' }}
                          >
                            <Typography.Title level={5} style={{ margin: 0 }}>
                              {item.title}
                            </Typography.Title>
                            <Typography.Title
                              level={5}
                              style={{ fontWeight: 'bold', margin: 0 }}
                            >
                              {formatCurrency(item.price)}
                            </Typography.Title>
                            <Space size="large">
                              <div className={s.box_count}>
                                <Button
                                  size="small"
                                  className={`${s.bg_count} ${s.button}`}
                                  onClick={() => {
                                    onQuantityChange(item, item.quantity - 1);
                                  }}
                                >
                                  <MinusOutlined />
                                </Button>
                                <Input
                                  type="number"
                                  size="small"
                                  className={s.text_count}
                                  value={item.quantity}
                                  onChange={(e) => {
                                    onQuantityChange(
                                      item,
                                      parseInt(e.target.value)
                                    );
                                  }}
                                  bordered={false}
                                  max={item.stock}
                                  required={false}
                                />

                                <Button
                                  size="small"
                                  className={`${s.bg_count} ${s.button}`}
                                  onClick={() => {
                                    onQuantityChange(item, item.quantity + 1);
                                  }}
                                >
                                  <PlusOutlined />
                                </Button>
                              </div>
                              <div>
                                {item?.stock > 0 ? (
                                  <Typography.Text style={{ fontSize: 13 }}>
                                    Kho còn:
                                    <span
                                      style={{
                                        fontWeight: 600,
                                        padding: '0 5px'
                                      }}
                                    >
                                      {item?.stock}
                                    </span>
                                  </Typography.Text>
                                ) : (
                                  <Typography.Text
                                    style={{
                                      fontSize: 13,
                                      color: 'red',
                                      fontWeight: 600
                                    }}
                                  >
                                    Sản phẩm đã hết
                                  </Typography.Text>
                                )}
                              </div>
                            </Space>
                          </Space>
                          <Button
                            type="text"
                            style={{ padding: '4px 8px' }}
                            onClick={() => removeItem(item.id)}
                          >
                            <CloseOutlined />
                          </Button>
                        </Space>
                      </Card>
                    </List.Item>
                  )}
                </VirtualList>
              </List>
            ) : (
              <Empty description={'No products in cart'} />
            )}
          </Space>
          <Space direction="vertical" size="middle" style={{ display: 'flex' }}>
            <Divider style={{ marginBottom: 0 }} />
            <Row justify="space-between">
              <Col>
                <Typography.Title level={4} style={{ margin: 0 }}>
                  Tổng cộng
                </Typography.Title>
              </Col>
              <Col>
                <Typography.Title
                  level={4}
                  style={{ fontWeight: 'bold', margin: 0 }}
                >
                  {formatCurrency(cart.totalAmount)}
                </Typography.Title>
              </Col>
            </Row>

            <Button
              shape="round"
              type="danger"
              block
              style={{ textTransform: 'uppercase', height: 46 }}
              onClick={() => {
                cart?.count === 0
                  ? notification.info({
                      message: 'Giỏ hàng trống...!'
                    })
                  : navigate('/checkout');
                closeCart();
              }}
            >
              Thanh toán
            </Button>
          </Space>
        </div>
      </Drawer>
    </>
  );
};

CartPanel.displayName = 'CartPanel';

export default CartPanel;
