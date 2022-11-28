import React, { useEffect, useState } from 'react';
import {
  Button,
  Divider,
  Popconfirm,
  Space,
  Table,
  Typography,
  Image,
  Input,
  notification
} from 'antd';
import { Link } from 'react-router-dom';
import {
  PlusOutlined,
  EditOutlined,
  QuestionCircleOutlined,
  DeleteOutlined
} from '@ant-design/icons';
import userAPI from 'src/api/auth';
import { UserInfo } from 'src/portals/commerce/hooks/AppContext';
import Avatar from 'src/components/image/avatar';

const { Title, Text } = Typography;

const UserPage: React.FC = () => {
  const [users, setUsers] = useState<UserInfo[]>([]);

  const fetchList = () => {
    userAPI.get().then((res) => {
      setUsers(res);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  const onDelete = (id: string) => {
    userAPI.remove(id).then(() => {
      notification.open({
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
        <Title style={{ margin: 0 }}>User</Title>
        <Button type="primary" shape="circle" size="large">
          <Link to="/admin/user/new">
            <PlusOutlined />
          </Link>
        </Button>
      </Space>
      <Divider />
      <Table
        dataSource={users}
        rowKey="id"
        style={{ padding: '0 55px' }}
        scroll={{ y: 685 }}
      >
        <Table.Column
          title="Avatar"
          dataIndex="imageUrl"
          key="avatar"
          render={(imageUrl) => <Avatar src={imageUrl} size="default" />}
        />
        <Table.Column title="Fullname" dataIndex="fullname" key="fullname" />
        <Table.Column title="Email" dataIndex="email" key="email" />
        <Table.Column title="Phone" dataIndex="phone" key="phone" />
        <Table.Column title="Address" dataIndex="address" key="address" />
        <Table.Column title="Role" dataIndex="role" key="role" />

        <Table.Column
          title="Action"
          dataIndex="id"
          key="action"
          align="center"
          render={(id) => {
            return (
              <>
                <Button>
                  <Link to={`/admin/user/${id}`}>
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

UserPage.displayName = 'UserPage';
export default UserPage;
