import React, { useEffect } from 'react';
import { Outlet } from 'react-router-dom';
import { Layout } from 'antd';
import s from './index.module.scss';

const Content: React.FC = () => {
  return (
    <Layout.Content className={s.layout_content}>
      <Outlet />
    </Layout.Content>
  );
};

Content.displayName = 'Content';
export default Content;
