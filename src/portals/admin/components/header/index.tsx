import { Layout } from 'antd';
import React from 'react';
import s from './index.module.scss';

const Header: React.FC = () => {
  return (
    <div className={s.container}>
      <Layout.Header>Text in header</Layout.Header>
    </div>
  );
};

Header.displayName = 'Header';
export default Header;
