import { Col, List, Row, Card, Image, Typography } from 'antd';
import React, { useEffect, useState } from 'react';
import s from './index.module.scss';
import allProductAPI from 'src/api/product-list';
import Images from 'src/components/image/index';
import { Link } from 'react-router-dom';
import { formatCurrency } from 'src/utils/func';

interface ProductListProps {
  id: string;
  title: string;
  imageUrl: string;
  selectedVariant: {
    id: string;
    price: number;
  };
}

const HomePage: React.FC = () => {
  const [productList, setProductList] = useState<ProductListProps[]>([]);

  const fetchList = () => {
    allProductAPI.get().then((res) => {
      setProductList(res);
    });
  };
  useEffect(() => {
    fetchList();
  }, []);

  return (
    <>
      <Row
        gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}
        style={{ margin: '1rem 0 4rem' }}
      >
        <Col span={8}>
          <Image
            src="https://bizweb.dktcdn.net/100/378/907/themes/754099/assets/slider_5.jpg?1628222565520"
            preview={false}
            className={s.slide_style_border}
            height={'100%'}
          />
        </Col>
        <Col span={8}>
          <Image
            src="https://bizweb.dktcdn.net/100/378/907/themes/754099/assets/slider_6.jpg?1628222565520"
            preview={false}
            height={'100%'}
            className={s.slide_style_border}
          />
        </Col>
        <Col span={8}>
          <Image
            src="https://meocun.com/wp-content/uploads/image1-12.jpg"
            preview={false}
            height={'100%'}
            className={s.slide_style_border}
          />
        </Col>
      </Row>
      <List
        grid={{ gutter: 16, column: 7 }}
        dataSource={productList}
        renderItem={(item) => {
          return (
            <>
              <Link to={`/product/${item.id}`}>
                <List.Item>
                  <span>
                    <Card hoverable style={{ textAlign: 'center' }}>
                      <Images
                        src={item.imageUrl}
                        preview={false}
                        style={{
                          maxHeight: 150,
                          maxWidth: 150
                        }}
                      />
                      <div style={{ textAlign: 'left' }}>
                        <Typography.Title
                          level={5}
                          ellipsis={{ rows: 2 }}
                          style={{ marginTop: 18 }}
                        >
                          {item.title}
                        </Typography.Title>

                        <Typography.Text
                          style={{ margin: '5px 0 ', fontSize: 20 }}
                          strong
                        >
                          {formatCurrency(item.selectedVariant.price)}
                        </Typography.Text>
                      </div>
                    </Card>
                  </span>
                </List.Item>
              </Link>
            </>
          );
        }}
      />
    </>
  );
};

HomePage.displayName = 'HomePage';
export default HomePage;
