import {
  Button,
  Divider,
  Input,
  notification,
  Popconfirm,
  Space,
  Table,
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
import { Link } from 'react-router-dom';
import optionsAPI from 'src/api/option';

interface VariantOptionsProps {
  id: string;
  key: string;
  value: string;
}

const VariantOptionsPage: React.FC = () => {
  const [variantOpts, setVariantOpts] = useState<VariantOptionsProps[]>([]);

  const fetchList = () => {
    optionsAPI.get().then((res) => {
      setVariantOpts(res);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  const onDelete = (id: string) => {
    optionsAPI.remove(id).then(() => {
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
        <Typography.Title>Options</Typography.Title>
        <Button
          type="primary"
          shape="circle"
          size="large"
          style={{ marginBottom: 15 }}
        >
          <Link to={'/admin/option/new'}>
            <PlusOutlined />
          </Link>
        </Button>
      </Space>
      <Divider />
      <Table
        dataSource={variantOpts}
        rowKey="id"
        style={{ padding: '0 55px' }}
        scroll={{ y: 685 }}
      >
        <Table.Column
          title="Key"
          dataIndex="key"
          key="key"
          render={(key) => {
            return (
              <>
                <Typography.Text>{key}</Typography.Text>
              </>
            );
          }}
          onFilter={(value: string, record: VariantOptionsProps) =>
            record.key.indexOf(value) === 0
          }
          sorter={(a, b) => a.key.length - b.key.length}
        />
        <Table.Column
          title="Value"
          dataIndex="value"
          key="value"
          render={(value) => {
            return (
              <>
                <Typography.Text>{value}</Typography.Text>
              </>
            );
          }}
          filterSearch={true}
          filterDropdown={({ setSelectedKeys, selectedKeys, confirm }) => {
            return (
              <>
                <div style={{ display: 'flex' }}>
                  <Input
                    autoFocus
                    allowClear
                    placeholder="Search here"
                    value={selectedKeys[0]}
                    onChange={(e) => {
                      setSelectedKeys(e.target.value ? [e.target.value] : []);
                      confirm({ closeDropdown: false });
                    }}
                    onPressEnter={() => {
                      confirm();
                    }}
                    onBlur={() => {
                      confirm();
                    }}
                  />
                  <Button
                    onClick={() => {
                      confirm();
                    }}
                    type="primary"
                  >
                    <SearchOutlined />
                  </Button>
                </div>
              </>
            );
          }}
          filterIcon={() => {
            return <SearchOutlined />;
          }}
          onFilter={(value: string, record: VariantOptionsProps) => {
            return record.value
              .toString()
              .toLocaleLowerCase()
              .includes(value.toLocaleString());
          }}
          sorter={(a, b) => a.value.length - b.value.length}
          sortDirections={['descend']}
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
                  <Link to={`/admin/option/${id}`}>
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

VariantOptionsPage.displayName = 'VariantOptionsPage';
export default VariantOptionsPage;
