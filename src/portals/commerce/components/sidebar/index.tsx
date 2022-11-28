import { HddOutlined, GithubOutlined, GitlabOutlined } from '@ant-design/icons';
import { Card, Layout, List, Menu, MenuProps, Tabs, Typography } from 'antd';
import { ItemType } from 'antd/lib/menu/hooks/useItems';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import s from './index.module.scss';
import categoryAPI from 'src/api/category';
import Images from 'src/components/image/index';
import { formatCurrency } from 'src/utils/func';

// interface CategoriesProps {
//   id: string;
//   title: string;
//   imageUrl: string;
//   products: ProductListProps;
// }

// interface ProductListProps {
//   id: string;
//   title: string;
//   imageUrl: string;
//   variants: {
//     price: number;
//   };
// }

const Sidebar: React.FC = () => {
  const { Sider } = Layout;
  // const [categoryItem, setCategorItem] = useState<CategoriesProps[]>([]);

  // const fetchList = () => {
  //   categoryAPI.get().then((res) => {
  //     setCategorItem(res);
  //   });
  // };
  // useEffect(() => {
  //   fetchList();
  // }, []);

  const items: ItemType[] = [
    {
      key: '_allcategory',
      icon: <HddOutlined className={s.size_icon} />,
      label: <Link to="/">All Category</Link>
    }
    // {
    //   key: '_shopmeo',
    //   icon: <GithubOutlined className={s.size_icon} />,
    //   label: <Link to="">Shop Meo</Link>
    // },
    // {
    //   key: '_shopcun',
    //   icon: <GitlabOutlined className={s.size_icon} />,
    //   label: <Link to="">Shop Cún</Link>
    // },
    // {
    //   key: '_vatcucho',
    //   icon: <HddOutlined className={s.size_icon} />,
    //   label: <Link to="">Vật dụng cho Meo</Link>
    // },
    // {
    //   key: '_vatcumeo',
    //   icon: <HddOutlined className={s.size_icon} />,
    //   label: <Link to="">Vật dụng cho Cún</Link>
    // }
  ];

  return (
    <Sider style={{ background: '#fff', marginTop: 15 }}>
      <Menu
        defaultSelectedKeys={['_allcategory']}
        mode="inline"
        items={items}
        style={{ height: '100%', paddingTop: 15, fontSize: 16 }}
      />
    </Sider>
  );
};

Sidebar.displayName = 'Sidebar';
export default Sidebar;
