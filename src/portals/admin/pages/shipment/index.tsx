import {
  Button,
  Divider,
  message,
  notification,
  Popconfirm,
  Space,
  Table,
  Typography
} from 'antd';
import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  PlusOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import shipmentAPI from 'src/api/shipment';
import { formatCurrency } from 'src/utils/func';

interface ShipmentModel {
  id: string;
  title: string;
  costPerKg: number;
}

const ShipmentPage: React.FC = () => {
  const [shipments, setShipments] = useState<ShipmentModel[]>([]);

  const fetchList = () => {
    shipmentAPI.get().then((res) => {
      setShipments(res);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  const onDelete = (id: string) => {
    shipmentAPI.remove(id).then(() => {
      notification.success({
        message: 'Delected',
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
        <Typography.Title style={{ margin: 0 }}>Shipment</Typography.Title>
        <Button type="primary" shape="circle" size="large">
          <Link to="/admin/shipment/new">
            <PlusOutlined />
          </Link>
        </Button>
      </Space>
      <Divider />
      <Table
        dataSource={shipments}
        rowKey="id"
        style={{ padding: '0 55px' }}
        scroll={{ y: 685 }}
      >
        <Table.Column
          title="Title"
          dataIndex="title"
          key="title"
          render={(title) => {
            return (
              <>
                <Typography.Text>{title}</Typography.Text>
              </>
            );
          }}
        />
        <Table.Column
          title="Cost PerKg"
          dataIndex="costPerKg"
          key="costPerKg"
          render={(costPerKg) => {
            return (
              <>
                <Typography.Text>{formatCurrency(costPerKg)}</Typography.Text>
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
                <Button>
                  <Link to={`/admin/shipment/${id}`}>
                    <EditOutlined />
                  </Link>
                </Button>
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

ShipmentPage.displayName = 'ShipmentPage';
export default ShipmentPage;
