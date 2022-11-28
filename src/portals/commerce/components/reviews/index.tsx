import { Button, Comment, Form, Input, List, Spin } from 'antd';
import moment from 'moment';
import React, { useContext, useEffect, useState } from 'react';
import AppContext from '../../hooks/AppContext';
import reviewApi from 'src/api/review';
import Avatar from 'src/components/image/avatar';
import { useParams } from 'react-router-dom';

const { TextArea } = Input;

interface ReviewItem {
  id: string;
  isPublish: boolean;
  message: string;
  star: number;
  userId: string;
  _createdDate: string;
}

const ProductReviews: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewItem[]>(null);
  const [submitting, setSubmitting] = useState(false);

  const { userInfo } = useContext(AppContext);
  const [form] = Form.useForm();
  const { id } = useParams();
  const tzOffset = new Date().getTimezoneOffset();

  const onSubmit = (values) => {
    setSubmitting(true);
    reviewApi
      .create({
        message: values.message,
        star: null,
        productId: id,
        userId: userInfo?.id
      })
      .then(() => {
        form.resetFields();
        fetchReviews();
      })
      .finally(() => setSubmitting(false));
  };

  const fetchReviews = () => {
    reviewApi.getByProductId(id).then((res) => setReviews(res));
  };

  useEffect(() => {
    fetchReviews();
  }, []);

  if (!reviews) {
    return <Spin />;
  }

  return (
    <>
      <Form form={form} onFinish={onSubmit}>
        <Comment
          avatar={<Avatar src={userInfo.imageUrl} />}
          content={
            <>
              <Form.Item name="message" rules={[{ required: true }]}>
                <TextArea rows={4} />
              </Form.Item>
              <Form.Item style={{ marginBottom: 0 }}>
                <Button htmlType="submit" loading={submitting} type="primary">
                  Gửi
                </Button>
              </Form.Item>
            </>
          }
        />
      </Form>
      {reviews.length > 0 && (
        <List
          dataSource={reviews}
          itemLayout="horizontal"
          renderItem={(item: any) => (
            <Comment
              author={'Anonymous'}
              avatar={<Avatar src={userInfo.imageUrl} />}
              content={<p>{item.message}</p>}
              datetime={moment(item._createdDate).zone(tzOffset).fromNow()}
            />
          )}
        />
      )}
    </>
  );
};

ProductReviews.displayName = 'ProductReviews';
export default ProductReviews;
