import {
  OrderedListOutlined,
  FileProtectOutlined,
  LogoutOutlined,
  StrikethroughOutlined,
  ApartmentOutlined,
  UserOutlined,
  AppstoreOutlined,
  DollarCircleOutlined,
  HomeOutlined,
  CommentOutlined
} from '@ant-design/icons';
import { Menu, Layout } from 'antd';
import React, { useState, useMemo } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import { Logout } from 'src/utils/auth';
import style from '../header/index.module.scss';

const { Sider } = Layout;

export default function Sidebar() {
  const [collapsed, setCollapsed] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const getSelected = () => {
    const [, pathname] = location.pathname.split('/');
    return `/${pathname}/`;
  };

  const items = useMemo(
    () => [
      {
        key: '/admin/category',
        icon: <AppstoreOutlined />,
        label: <Link to="/admin/category">Category</Link>
      },
      {
        key: '/admin/product',
        icon: <FileProtectOutlined />,
        label: <Link to="/admin/product">Product</Link>
      },
      {
        key: '/admin/option',
        icon: <ApartmentOutlined />,
        label: <Link to="/admin/option">Option</Link>
      },
      {
        key: '/admin/order',
        icon: <OrderedListOutlined />,
        label: <Link to="/admin/order">Order</Link>
      },
      {
        key: '/admin/shipment',
        icon: <StrikethroughOutlined />,
        label: <Link to="/admin/shipment">Shipment</Link>
      },
      {
        key: '/admin/payment',
        icon: <DollarCircleOutlined />,
        label: <Link to="/admin/payment">Payment</Link>
      },
      {
        key: '/admin/review',
        icon: <CommentOutlined />,
        label: <Link to="/admin/review">Review</Link>
      },
      {
        key: '/admin/user',
        icon: <UserOutlined />,
        label: <Link to="/admin/user">User</Link>
      },
      {
        key: '/home',
        icon: <HomeOutlined />,
        label: <Link to="/">Go Home</Link>
      },
      {
        key: '/logout',
        icon: <LogoutOutlined />,
        onClick: Logout,
        label: 'Logout'
      }
    ],
    []
  );

  return (
    <Sider collapsible collapsed={collapsed} onCollapse={setCollapsed}>
      <div className={style.user}>Admin</div>
      <Menu
        theme="dark"
        mode="inline"
        defaultSelectedKeys={[getSelected() + 'category']}
        items={items}
      />
    </Sider>
  );
}
