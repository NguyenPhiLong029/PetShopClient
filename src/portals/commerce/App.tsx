import { BackTop, Layout, message } from 'antd';
import React, { useEffect, useState } from 'react';
import Sidebar from './components/sidebar';
import Header from './components/header';
import Content from './components/content';
import Footer from './components/footer';
import './app.scss';
import { Loading3QuartersOutlined } from '@ant-design/icons';
import { AppContext, AppLoadProps } from './hooks/AppContext';
import { Cart } from './hooks/useCart';
import { getToken, getUserInfo } from 'src/utils/auth';

export const appLoad = async (): Promise<AppLoadProps> => {
  const data: AppLoadProps = {
    userInfo: {} as any,
    appConfig: {} as any,
    cart: {
      totalPrice: 0,
      totalQuantity: 0,
      items: []
    } as any,
    isAuth: false
  };
  try {
    if (getToken()) {
      data.userInfo = getUserInfo();
      data.isAuth = true;
    }
    const cartStorage = window.localStorage.getItem('cart');
    if (cartStorage) {
      const cart = JSON.parse(cartStorage) as Cart;
      data.cart = cart;
    }
    return data;
  } catch (e) {
    message.error('appLoad failed', e.message);
  }
};

const App: React.FC = () => {
  const [appContextData, setAppContextData] = useState<AppLoadProps>();

  useEffect(() => {
    appLoad().then((data) => {
      setAppContextData(data);
    });
  }, []);

  if (!appContextData) {
    return (
      <div className="loading-page">
        <Loading3QuartersOutlined className="loading-page__icon" spin />
      </div>
    );
  }

  return (
    <AppContext.Provider
      value={{
        ...appContextData,
        restore: setAppContextData
      }}
    >
      <Layout className="layout_app">
        <BackTop />
        <Header />
        <Layout.Content style={{ padding: '0 50px' }}>
          <Layout
            className="site-layout-background"
            style={{ padding: '12px 0' }}
          >
            <Sidebar />
            <Content />
          </Layout>
        </Layout.Content>
        <Footer />
      </Layout>
    </AppContext.Provider>
  );
};

export default App;
