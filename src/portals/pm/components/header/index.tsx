import React from 'react';
import { Layout } from 'antd';
import s from './index.module.scss';

const Header: React.FC = () => {
  return <Layout.Header className={s.layout_header}></Layout.Header>;
};

Header.displayName = 'Header';
export default Header;
