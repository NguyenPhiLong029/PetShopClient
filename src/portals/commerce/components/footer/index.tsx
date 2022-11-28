import React from 'react';
import { Layout } from 'antd';
import s from './index.module.scss';

const Footer: React.FC = () => {
  return (
    <Layout.Footer className={s.layout_footer}>
      Ant Design ©2018 Created by Ant UED
    </Layout.Footer>
  );
};

Footer.displayName = 'Footer';
export default Footer;
