import {
  Divider,
  Space,
  Table,
  Typography,
  Popconfirm,
  message,
  notification,
  Tooltip
} from 'antd';
import Button from 'antd-button-color';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  QuestionCircleOutlined,
  EditOutlined,
  DeleteOutlined,
  PlusOutlined
} from '@ant-design/icons';
import paymentAPI from 'src/api/payment';

const { Title, Text } = Typography;

interface PaymentModel {
  id: string;
  title: string;
}

const PaymentPage: React.FC = () => {
  const [payments, setPayments] = useState<PaymentModel[]>([]);

  const fetchList = () => {
    paymentAPI.get().then((data) => {
      setPayments(data);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  const onDelete = (id: string) => {
    paymentAPI.remove(id).then(() => {
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
        <Title style={{ margin: 0 }}>Payment</Title>
        <Button type="primary" shape="circle" size="large">
          <Link to="/admin/payment/new">
            <PlusOutlined />
          </Link>
        </Button>
      </Space>
      <Divider />
      <Table
        dataSource={payments}
        rowKey="id"
        style={{ padding: '0 55px' }}
        scroll={{ y: 685 }}
      >
        <Table.Column
          title="Title"
          dataIndex="title"
          key="title"
          render={(id) => {
            return (
              <>
                <Text>{id}</Text>
              </>
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
                <Tooltip title="Edit">
                  <Button>
                    <Link to={`/admin/payment/${id}`}>
                      <EditOutlined />
                    </Link>
                  </Button>
                </Tooltip>
                <Popconfirm
                  title="Sure to delete?"
                  icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                  onConfirm={() => {
                    onDelete(id);
                  }}
                  okText="Yes"
                  cancelText="No"
                >
                  <Tooltip title="Delete">
                    <Button style={{ marginLeft: 6 }}>
                      <DeleteOutlined style={{ color: 'red' }} />
                    </Button>
                  </Tooltip>
                </Popconfirm>
              </>
            );
          }}
        />
      </Table>
    </>
  );
};

PaymentPage.displayName = 'PaymentPage';
export default PaymentPage;
