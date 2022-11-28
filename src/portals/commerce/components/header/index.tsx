import React, { useContext, useEffect, useRef, useState } from 'react';
import {
  Col,
  Layout,
  Row,
  Input,
  Image,
  Tooltip,
  Badge,
  Popover,
  Affix,
  Space
} from 'antd';
import Button from 'antd-button-color';
import s from './index.module.scss';
import {
  ShoppingCartOutlined,
  SearchOutlined,
  IdcardOutlined,
  LoginOutlined,
  LogoutOutlined,
  UserOutlined
} from '@ant-design/icons';
import { Link, useNavigate } from 'react-router-dom';
import CartPanel from '../cart-panel';
import AppContext from '../../hooks/AppContext';
import logo from 'src/components/image/logo.png';
import Avatar from 'src/components/image/avatar';
import { Logout } from 'src/utils/auth';
import userAPI from 'src/api/auth';
import { UserInfoModel } from '../../pages/userinfo';
import { UserRole } from 'src/utils/constant';

const Header: React.FC = () => {
  const [userData, setUserData] = useState<UserInfoModel>(null);
  const [openCart, setOpenCart] = useState(false);

  const { cart, userInfo } = useContext(AppContext);
  const navigate = useNavigate();
  const mounted = useRef(false);

  const fetchOne = () => {
    userAPI.getOne(userInfo.id).then((res) => {
      setUserData(res);
    });
  };

  useEffect(() => {
    fetchOne();
  }, []);

  useEffect(() => {
    if (mounted.current && !openCart) {
      setOpenCart(true);
    } else {
      mounted.current = true;
    }
    if (cart.count === 0) {
      setOpenCart(false);
    }
  }, [cart]);

  return (
    <Layout.Header className="header" style={{ backgroundColor: '#fb5231' }}>
      <Row className={s.color} style={{ height: 64 }}>
        <Col span={4} style={{ height: '100%' }}>
          <Link to="/">
            <Image preview={false} src={logo} height={'100%'} />
          </Link>
        </Col>
        <Col
          span={14}
          className={s.display}
          style={{ display: 'flex', height: '100%' }}
        >
          <Input
            placeholder="What are you looking for?"
            allowClear
            size="large"
            style={{
              width: '80%',
              borderRadius: '8px 0 0 8px',
              border: '1px solid #fb5231',
              borderRight: 'none'
            }}
          />
          <Tooltip title="Search">
            <Button
              icon={<SearchOutlined />}
              size="large"
              style={{
                borderRadius: '0 8px 8px 0',
                color: '#fff',
                backgroundColor: '#000',
                border: '1px solid black'
              }}
            />
          </Tooltip>
        </Col>
        <Col span={6} style={{ height: '100%' }}>
          <Row justify="space-evenly">
            <Col span={6}>
              <Badge count={cart.count} size="small" offset={[-2, 5]}>
                <Tooltip title="Giỏ hàng">
                  <Button
                    type="danger"
                    danger
                    shape="circle"
                    icon={<ShoppingCartOutlined sizes="large" />}
                    size="large"
                    onClick={() => setOpenCart(true)}
                    style={{ color: '#000' }}
                  />
                </Tooltip>
              </Badge>
              <CartPanel open={openCart} closeCart={() => setOpenCart(false)} />
            </Col>
            <Col span={6}>
              {userData?.id ? (
                <Popover
                  content={
                    <Space
                      direction="vertical"
                      size="middle"
                      style={{ display: 'flex' }}
                    >
                      <Button
                        icon={<UserOutlined />}
                        onClick={() => navigate(`/userinfo/${userData.id}`)}
                        style={{ width: '100%' }}
                      >
                        Thông tin người dùng
                      </Button>
                      {userInfo?.role === UserRole.Admin ? (
                        <Button
                          onClick={() => navigate('/admin')}
                          style={{ width: '100%' }}
                          icon={<IdcardOutlined />}
                        >
                          Admin
                        </Button>
                      ) : null}
                      <Button
                        icon={<LogoutOutlined />}
                        onClick={Logout}
                        style={{ width: '100%' }}
                      >
                        Đăng xuất
                      </Button>
                    </Space>
                  }
                  title={userData.fullname}
                >
                  <Avatar src={userData.imageUrl} />
                </Popover>
              ) : (
                <Tooltip title="Đăng nhập">
                  <Button
                    type="danger"
                    danger
                    shape="circle"
                    icon={<LoginOutlined sizes="large" />}
                    size="large"
                    onClick={() => navigate('/auth/login')}
                    style={{ color: '#000' }}
                  />
                </Tooltip>
              )}
            </Col>
          </Row>
        </Col>
      </Row>
    </Layout.Header>
  );
};

Header.displayName = 'Header';
export default Header;
