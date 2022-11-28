import { BuildOutlined, HddOutlined } from '@ant-design/icons';
import { Avatar, Layout, Menu } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import s from './index.module.scss';

const { Sider } = Layout;

const items: ItemType[] = [
  {
    key: '_project',
    icon: <HddOutlined />,
    label: <Link to="/project">Project</Link>
  },
  {
    key: '_sprint',
    icon: <BuildOutlined />,
    label: <Link to="/sprint">Sprint</Link>
  }
];

const Sidebar: React.FC = () => {
  const [collapsed, setCollapsed] = useState(false);

  return (
    <Sider
      collapsible
      collapsed={collapsed}
      onCollapse={(value) => setCollapsed(value)}
    >
      <div className={s.avatar}>
        <Avatar style={{ backgroundColor: '#87d068' }} size="large">
          User
        </Avatar>
      </div>
      <Menu
        theme="dark"
        defaultSelectedKeys={['2']}
        mode="inline"
        items={items}
      />
    </Sider>
  );
};

Sidebar.displayName = 'Sidebar';
export default Sidebar;
