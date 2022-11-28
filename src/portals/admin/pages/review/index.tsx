import {
  Button,
  Divider,
  Form,
  Input,
  notification,
  Popconfirm,
  Space,
  Switch,
  Table,
  Tag,
  Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import {
  PlusOutlined,
  QuestionCircleOutlined,
  SearchOutlined,
  EditOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import { Link, useParams } from 'react-router-dom';
import reviewAPI, { update } from 'src/api/review';
import { composeK } from 'ramda';

interface ReviewProps {
  id: string;
  message: string;
  star: number;
  isPublish: boolean;
  product: ProductModel;
  userId?: string;
}

interface ProductModel {
  id: string;
  title: string;
}

const ReviewsPage: React.FC = () => {
  const [reviews, setReviews] = useState<ReviewProps[]>([]);

  const fetchList = () => {
    reviewAPI.get().then((res) => {
      setReviews(res);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  const onUpdate = (id: string, checked: boolean) => {
    reviewAPI.update(id, checked);
  };

  const onDelete = (id: string) => {
    reviewAPI.remove(id).then(() => {
      notification.success({
        message: 'Deleted',
        icon: <DeleteOutlined style={{ color: 'red' }} />
      });
      fetchList();
    });
  };

  return (
    <>
      <Space
        size="middle"
        style={{
          display: 'flex',
          justifyContent: 'space-between',
          padding: '0 20px'
        }}
      >
        <Typography.Title>Reviews</Typography.Title>
      </Space>
      <Divider />
      <Table
        dataSource={reviews}
        rowKey="id"
        style={{ padding: '0 55px' }}
        scroll={{ y: 685 }}
      >
        <Table.Column
          title="Product"
          dataIndex="product"
          key="product"
          render={(_, record: ReviewProps) => {
            return (
              <>
                <Typography.Text>{record.product.title}</Typography.Text>
              </>
            );
          }}
        />
        <Table.Column
          title="Message"
          dataIndex="message"
          key="message"
          render={(message) => {
            return (
              <>
                <Typography.Text>{message}</Typography.Text>
              </>
            );
          }}
        />
        <Table.Column
          title="Star"
          dataIndex="star"
          key="star"
          render={(star) => {
            return (
              <>
                <Typography.Text>{star ? star : 'null'}</Typography.Text>
              </>
            );
          }}
        />
        <Table.Column
          title="Publish"
          dataIndex="isPublish"
          key="isPublish"
          render={(isPublish, record: ReviewProps) => {
            return (
              <Switch
                defaultChecked={isPublish}
                checkedChildren="True"
                unCheckedChildren="False"
                onChange={(checked) => {
                  onUpdate(record.id, checked);
                }}
              />
            );
          }}
        />
        <Table.Column
          title="Action"
          dataIndex="id"
          key="action"
          align="center"
          render={(id) => {
            return (
              <>
                <Popconfirm
                  title="Sure to delete?"
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  onConfirm={() => {
                    onDelete(id);
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Button style={{ marginLeft: 6 }}>
                    <DeleteOutlined style={{ color: 'red' }} />
                  </Button>
                </Popconfirm>
              </>
            );
          }}
        />
      </Table>
    </>
  );
};

ReviewsPage.displayName = 'ReviewsPage';
export default ReviewsPage;
