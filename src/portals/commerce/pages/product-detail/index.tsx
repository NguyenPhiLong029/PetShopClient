import {
  Col,
  Row,
  Typography,
  Space,
  Button,
  Tabs,
  Spin,
  List,
  Radio,
  RadioChangeEvent,
  Divider,
  message
} from 'antd';
import React, { useEffect, useState } from 'react';
import s from './index.module.scss';
import productDetailAPI from 'src/api/product-detail';
import { useParams } from 'react-router-dom';
import Image from 'src/components/image/index';
import { clone } from 'ramda';
import useCart from '../../hooks/useCart';
import { formatCurrency } from 'src/utils/func';
import ProductReviews from '../../components/reviews';
import VirtualList from 'rc-virtual-list';

const { Title, Text } = Typography;

type OptionsUI = {
  key: string;
  values: string[];
};

interface Option {
  key: string;
  value: string;
}

type Variant = {
  id: string;
  title: string;
  sku: string;
  stock: number;
  price: number;
  weight: number;
  imageUrl: string;
  option_1: Option;
  option_2: Option;
  option_3: Option;
};

interface ProductDetail {
  id: string;
  images: string[];
  title: string;
  options: OptionsUI[];
  description: string;
  variants: Variant[];
  selectedVariant: Variant;
}

const ProductPage: React.FC = () => {
  const [productDetail, setProductDetail] = useState<ProductDetail>(null);
  const [selectedThumb, setSelectedThumb] = useState<string>(null);
  const [selectedVariant, setSelectedVariant] = useState<Variant>(null);
  const [selectedOptions, setSelectedOptions] = useState<Option[]>([]);

  const { id } = useParams();
  const { addItem } = useCart();

  const initSelectedOptions = (selectedVariant: Variant) => {
    if (selectedVariant) {
      const options = [];
      if (selectedVariant.option_1) {
        options.push({
          key: selectedVariant.option_1.key,
          value: selectedVariant.option_1.value
        });
      }
      if (selectedVariant.option_2) {
        options.push({
          key: selectedVariant.option_2.key,
          value: selectedVariant.option_2.value
        });
      }
      if (selectedVariant.option_3) {
        options.push({
          key: selectedVariant.option_3.key,
          value: selectedVariant.option_3.value
        });
      }
      if (options.length) {
        setSelectedOptions(options);
      }
    }
  };

  const fetchList = () => {
    productDetailAPI.get(id).then((res: ProductDetail) => {
      setProductDetail(res);
      setSelectedThumb(res.selectedVariant?.imageUrl || res.images[0]);
      setSelectedVariant(res.selectedVariant);
      initSelectedOptions(res.selectedVariant);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  const onChangeOption = (e: RadioChangeEvent) => {
    const { name, value } = e.target;
    setSelectedOptions((options) => {
      let cloneOptions = clone(options);
      const found = cloneOptions?.some((opt) => opt.key === name);
      if (found) {
        cloneOptions = cloneOptions.filter((o) => o.key !== name);
      }
      return [...cloneOptions, { key: name, value }];
    });
  };

  useEffect(() => {
    if (
      selectedOptions.length &&
      productDetail?.variants &&
      selectedOptions.length === productDetail.options.length
    ) {
      const matchVariant = productDetail?.variants.find((variant) => {
        let match = false;
        for (const index in selectedOptions) {
          const selectedOtp = selectedOptions[index];
          if (
            variant.option_1 &&
            variant.option_1.key === selectedOtp.key &&
            variant.option_1.value === selectedOtp.value
          ) {
            match = true;
          } else if (
            variant.option_2 &&
            variant.option_2.key === selectedOtp.key &&
            variant.option_2.value === selectedOtp.value
          ) {
            match = true;
          } else if (
            variant.option_3 &&
            variant.option_3.key === selectedOtp.key &&
            variant.option_3.value === selectedOtp.value
          ) {
            match = true;
          } else {
            match = false;
            break;
          }
        }
        return match;
      });

      setSelectedVariant(matchVariant);
      setSelectedThumb(matchVariant?.imageUrl || productDetail.images[0]);
    }
  }, [selectedOptions, productDetail]);

  if (!productDetail) {
    return <Spin />;
  }

  const ContainerCartItemHeight = 540;
  const onScroll = (e: React.UIEvent<HTMLElement, UIEvent>) => {
    if (
      e.currentTarget.scrollHeight - e.currentTarget.scrollTop ===
      ContainerCartItemHeight
    ) {
      productDetail.images;
    }
  };

  return (
    <>
      <div className={s.container} style={{ margin: 'auto' }}>
        <Row gutter={{ xs: 16, sm: 24, md: 32, lg: 46 }}>
          <Col span={12}>
            <Row>
              <Col span={3}>
                <List>
                  <VirtualList
                    data={productDetail.images}
                    height={ContainerCartItemHeight}
                    itemHeight={47}
                    itemKey="id"
                    onScroll={onScroll}
                  >
                    {(src) => (
                      <List.Item
                        className={`${s.slide_item} ${
                          selectedThumb === src ? s.slide_selected : ''
                        }`}
                        style={{ padding: 0 }}
                      >
                        <Image
                          src={src}
                          preview={false}
                          onClick={() => {
                            setSelectedThumb(src);
                          }}
                          className={s.image_item}
                        />
                      </List.Item>
                    )}
                  </VirtualList>
                </List>
              </Col>
              <Col
                span={15}
                offset={3}
                style={{
                  maxHeight: 580,
                  maxWidth: 450,
                  display: 'flex',
                  alignItems: 'center'
                }}
              >
                <Image
                  width={'100%'}
                  height={'auto'}
                  src={`${selectedThumb}`}
                />
              </Col>
            </Row>
          </Col>
          <Col span={12}>
            <Space
              direction="vertical"
              size="middle"
              style={{ display: 'flex' }}
            >
              <Title level={2} style={{ margin: 0 }}>
                {selectedVariant?.title || productDetail.title}
              </Title>

              <Text className={s.price}>
                {formatCurrency(selectedVariant?.price)}
              </Text>

              {productDetail.options?.map((option) => {
                const selected = selectedOptions.find(
                  (opt) => opt.key === option.key
                );

                return (
                  <Space size={20} key={option.key}>
                    <Text
                      style={{
                        fontWeight: 700,
                        textTransform: 'capitalize',
                        fontSize: 16
                      }}
                    >
                      {option.key + ':'}
                    </Text>
                    <Radio.Group
                      buttonStyle="solid"
                      name={option.key}
                      onChange={onChangeOption}
                      value={selected?.value}
                    >
                      {option.values.map((v) => (
                        <Radio.Button
                          style={{ margin: '7px 16px 7px 0' }}
                          value={v}
                          key={v}
                        >
                          {v}
                        </Radio.Button>
                      ))}
                    </Radio.Group>
                  </Space>
                );
              })}

              <Space direction="vertical" size="large">
                <Space direction="vertical" size="large">
                  {selectedVariant?.stock > 0 ? (
                    <Typography.Text style={{ fontSize: 16 }}>
                      Còn
                      <span style={{ fontWeight: 600, padding: '0 5px' }}>
                        {selectedVariant?.stock}
                      </span>
                      sản phẩm
                    </Typography.Text>
                  ) : (
                    <Typography.Text
                      style={{ fontSize: 16, color: 'red', fontWeight: 600 }}
                    >
                      Sản phẩm đã hết
                    </Typography.Text>
                  )}

                  <Button
                    className={s.btn_cart}
                    size={'large'}
                    type={'primary'}
                    disabled={selectedVariant?.stock > 0 ? false : true}
                    onClick={() => {
                      message.success(
                        `Đã thêm ${selectedVariant.title} vào Giỏ hàng`
                      );

                      addItem({
                        id: selectedVariant.id,
                        title: selectedVariant.title,
                        stock: selectedVariant.stock,
                        sku: selectedVariant.sku,
                        price: selectedVariant.price,
                        weight: selectedVariant.weight,
                        imageUrl: selectedVariant.imageUrl,
                        quantity: 1,
                        options:
                          selectedVariant.option_1.value +
                          ' - ' +
                          selectedVariant.option_2?.value +
                          ' - ' +
                          selectedVariant.option_3?.value
                      });
                    }}
                  >
                    Thêm vào giỏ
                  </Button>
                </Space>
              </Space>
            </Space>
          </Col>
        </Row>

        <Tabs
          centered
          defaultActiveKey="1"
          type="line"
          style={{ marginTop: '30px' }}
          items={[
            {
              key: 'description',
              label: 'Thông tin chi tiết',
              children: productDetail.description
            },
            {
              key: 'reviews',
              label: 'Đánh giá sản phẩm',
              children: <ProductReviews />
            }
          ]}
        />
      </div>
    </>
  );
};

ProductPage.displayName = 'ProductPage';
export default ProductPage;
