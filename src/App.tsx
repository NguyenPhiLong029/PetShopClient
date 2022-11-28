import React, { useLayoutEffect, useState } from 'react';
import 'antd/dist/antd.css';
import './app.scss';
import { Router, Navigate, Route, Routes } from 'react-router-dom';
import AppCommerce from 'src/portals/commerce/App';
import AppPM from 'src/portals/pm/App';
import Admin from 'src/portals/admin/App';
import ProjectPage from 'src/portals/pm/pages/project';
import SprintPage from 'src/portals/pm/pages/sprint';
import CategoryPage from 'src/portals/admin/pages/category';
import CategoryDetailPage from 'src/portals/admin/pages/category/detail';

import UserPage from 'src/portals/admin/pages/user';
import UserDetailPage from 'src/portals/admin/pages/user/detail';

import AdminProductPage from 'src/portals/admin/pages/product';
import ProductDetailPage from 'src/portals/admin/pages/product/detail';

import Variants from 'src/portals/admin/pages/product/variants';
import VariantDetail from 'src/portals/admin/pages/product/variantDetail';

import ShipmentPage from 'src/portals/admin/pages/shipment';
import ShipmentDetailPage from 'src/portals/admin/pages/shipment/detail';

import OrderPage from 'src/portals/admin/pages/order';
import OrderDetailPage from 'src/portals/admin/pages/order/detail';

import PaymentPage from 'src/portals/admin/pages/payment';
import PaymentDetailPage from 'src/portals/admin/pages/payment/detail';

import VariantOptionsPage from 'src/portals/admin/pages/option';
import VariantOpstDetailPage from 'src/portals/admin/pages/option/detail';

import HomePage from 'src/portals/commerce/pages/home';
import ProductPage from 'src/portals/commerce/pages/product-detail';
import CheckoutPage from 'src/portals/commerce/pages/checkout';
import BillOrderPage from 'src/portals/commerce/pages/bill-order';
import UserInfoPage from 'src/portals/commerce/pages/userinfo';

import AppAuth from 'src/portals/auth/App';
import LoginPage from 'src/portals/auth/pages/login';
import RegisterPage from 'src/portals/auth/pages/register';
import history from 'src/utils/history';
import ForbiddenPage from './portals/auth/pages/forbidden';
import ReviewsPage from './portals/admin/pages/review';

const App: React.FC = () => {
  const [router, setRouter] = useState({
    action: history.action,
    location: history.location
  });

  useLayoutEffect(() => history.listen(setRouter), [history]);

  return (
    <Router
      basename={process.env.REACT_APP_BASE_URL}
      location={router.location}
      navigationType={router.action}
      navigator={history}
    >
      <Routes>
        <Route path="/" element={<AppCommerce />}>
          <Route path="" element={<HomePage />} />
          <Route path="checkout" element={<CheckoutPage />} />
          <Route path="userinfo/:id" element={<UserInfoPage />} />
          <Route path="orderconfirm" element={<BillOrderPage />} />
          <Route path="product/:id" element={<ProductPage />} />
          <Route path="category/:categoryId" element={<HomePage />} />
        </Route>
        <Route path="/pm" element={<AppPM />}>
          <Route path="project" element={<ProjectPage />} />
          <Route path="sprint" element={<SprintPage />} />
        </Route>
        <Route path="/admin" element={<Admin />}>
          <Route path="" element={<Navigate to="category" />} />
          <Route path="category" element={<CategoryPage />} />
          <Route path="category/:id" element={<CategoryDetailPage />} />

          <Route path="user" element={<UserPage />} />
          <Route path="user/:id" element={<UserDetailPage />} />

          <Route path="product" element={<AdminProductPage />} />
          <Route path="product/:id" element={<ProductDetailPage />} />

          <Route path="product/:id/variants" element={<Variants />} />
          <Route path="product/:id/variants/:vid" element={<VariantDetail />} />

          <Route path="shipment" element={<ShipmentPage />} />
          <Route path="shipment/:id" element={<ShipmentDetailPage />} />

          <Route path="order" element={<OrderPage />} />
          <Route path="order/:id" element={<OrderDetailPage />} />

          <Route path="payment" element={<PaymentPage />} />
          <Route path="payment/:id" element={<PaymentDetailPage />} />

          <Route path="option" element={<VariantOptionsPage />} />
          <Route path="option/:id" element={<VariantOpstDetailPage />} />

          <Route path="review" element={<ReviewsPage />} />
          {/* <Route path="review/:id" element={<VariantOpstDetailPage />} /> */}
        </Route>
        <Route path="/auth" element={<AppAuth />}>
          <Route path="login" element={<LoginPage />} />
          <Route path="register" element={<RegisterPage />} />
          <Route path="forbidden" element={<ForbiddenPage />} />
          <Route path="" element={<Navigate to="login" />} />
        </Route>
        <Route path="*" element={<Navigate to="/" />} />
      </Routes>
    </Router>
  );
};

export default App;
