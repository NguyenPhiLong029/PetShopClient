import React, { useEffect, useState } from 'react';
// import { Link } from 'react-router-dom';
import {
  Button,
  Divider,
  Form,
  Input,
  message,
  Popconfirm,
  Table,
  Typography,
  Avatar,
  DatePicker
} from 'antd';
import {
  PlusOutlined,
  EditOutlined,
  DeleteOutlined,
  QuestionCircleOutlined
} from '@ant-design/icons';
import NewSprint from './create';
import FormItem from 'antd/lib/form/FormItem';
import UploadImage from 'src/components/uploader';
import sprintAPI from 'src/api/sprint';

interface Item {
  logo: any;
  id: string;
  title: string;
  url: string;
}

const { Title } = Typography;

const SprintPage: React.FC = () => {
  const [visible, setVisible] = useState(false);
  const [data, setData] = useState([]);
  const [editRow, setEditRow] = useState(null);
  const [form] = Form.useForm();

  const fetchList = () => {
    sprintAPI.get().then((data) => {
      setData(data);
      setVisible(false);
    });
  };

  useEffect(() => {
    fetchList();
  }, []);

  const onUpdate = async (values: any) => {
    const { logo, title, id, logoId } = values;

    const formdata = new FormData();
    formdata.append('id', id);
    formdata.append('logoId', logoId);
    formdata.append('title', title);
    formdata.append('logo', logo[0].originFileObj, logo[0].name);

    await fetch('http://localhost:9900/sprint/' + values.id, {
      method: 'PUT',
      body: formdata
    })
      .then((res) => res.json())
      .then((resutl) => {
        message.success('Successful Update');
        setEditRow(null);
        fetchList();
      })
      .catch((err) => console.log(err));
  };

  const onDelete = async (values: any) => {
    await fetch('http://localhost:9900/sprint/' + values.id, {
      method: 'DELETE',
      body: JSON.stringify({ id: values.id, logoId: values.logoId }),
      headers: {
        'Content-Type': 'application/json'
      }
    })
      .then((res) => res.json())
      .then((resutl) => {
        message.success('Successful Delete');
      })
      .catch((err) => console.log(err));
    fetchList();
  };

  const cancel = () => {
    setEditRow(null);
  };

  return (
    <>
      <div className="page-title">
        <Title level={1}>All sprint</Title>
        <Button
          type="primary"
          shape="circle"
          size="large"
          onClick={() => setVisible(true)}
        >
          <PlusOutlined />
        </Button>
      </div>
      <Divider />
      <NewSprint
        visible={visible}
        onCancel={() => setVisible(false)}
        onCreated={() => fetchList()}
      />
      <Form form={form} onFinish={onUpdate}>
        <Table dataSource={data} rowKey={(r) => r.id}>
          <Table.Column
            title="Avatar"
            dataIndex="logo"
            key="logo"
            width="10%"
            align="center"
            colSpan={0}
            render={(logo, record: Item) => {
              if (editRow === record.id) {
                return (
                  <>
                    <FormItem name="logoId" hidden>
                      <Input type={'hidden'} />
                    </FormItem>
                    <FormItem name="logo" style={{ marginBottom: 0 }}>
                      <UploadImage
                        defaultImage={`http://localhost:9900` + logo.url}
                      />
                    </FormItem>
                  </>
                );
              } else {
                return (
                  <Avatar
                    size={{ xl: 44, xxl: 54 }}
                    src={`http://localhost:9900` + logo.url}
                  />
                );
              }
            }}
          />

          <Table.Column
            title="Name"
            dataIndex="title"
            key="title"
            align="left"
            colSpan={2}
            render={(title, record: Item) => {
              if (editRow === record.id) {
                return (
                  <>
                    <FormItem name="id" hidden>
                      <Input type={'hidden'} />
                    </FormItem>
                    <FormItem
                      name="title"
                      style={{ marginBottom: 0 }}
                      rules={[
                        { required: true },
                        { whitespace: true },
                        { min: 5 }
                      ]}
                    >
                      <Input />
                    </FormItem>
                  </>
                );
              } else {
                return <p style={{ margin: 0 }}>{title}</p>;
              }
            }}
          />

          <Table.Column
            title="Start Date"
            dataIndex="startDate"
            key="startDate"
            render={(startDate, record: Item) => {
              if (editRow === record.id) {
                return (
                  <>
                    <FormItem name="id" hidden>
                      <Input type={'hidden'} />
                    </FormItem>
                    <FormItem
                      name="startDate"
                      style={{ marginBottom: 0 }}
                      rules={[
                        { required: true },
                        { whitespace: true },
                        { min: 5 }
                      ]}
                    >
                      <DatePicker format={['DD/MM/YYYY', 'DD/MM/YY']} />
                    </FormItem>
                  </>
                );
              } else {
                return <p style={{ margin: 0 }}>{startDate}</p>;
              }
            }}
          />

          <Table.Column
            title="End Date"
            dataIndex="endDate"
            key="endDate"
            render={(endDate, record: Item) => {
              if (editRow === record.id) {
                return (
                  <>
                    <FormItem name="id" hidden>
                      <Input type={'hidden'} />
                    </FormItem>
                    <FormItem
                      name="endDate"
                      style={{ marginBottom: 0 }}
                      rules={[
                        { required: true },
                        { whitespace: true },
                        { min: 5 }
                      ]}
                    >
                      <DatePicker format={['DD/MM/YYYY', 'DD/MM/YY']} />
                    </FormItem>
                  </>
                );
              } else {
                return <p style={{ margin: 0 }}>{endDate}</p>;
              }
            }}
          />

          <Table.Column
            title="Action"
            key="action"
            width="15%"
            align="center"
            dataIndex="id"
            render={(id, record: Item) => {
              if (editRow === record.id) {
                return (
                  <>
                    <Button
                      onClick={() => {
                        form.submit();
                      }}
                      style={{ marginRight: 8 }}
                    >
                      Save
                    </Button>
                    <Button onClick={cancel}>Cancel</Button>
                  </>
                );
              } else {
                return (
                  <>
                    <Button
                      onClick={() => {
                        setEditRow(record.id);
                        form.setFieldsValue({
                          logo: `http://localhost:9900` + record.logo.url,
                          logoId: record.logo.id,
                          title: record.title,
                          id: record.id
                        });
                      }}
                    >
                      <EditOutlined />
                    </Button>
                    <Popconfirm
                      title="Sure to delete?"
                      icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
                      onConfirm={() =>
                        onDelete({ id: record.id, logoId: record.logo.id })
                      }
                      okText="Yes"
                      cancelText="No"
                    >
                      <Button style={{ marginLeft: 6 }}>
                        <DeleteOutlined style={{ color: 'red' }} />
                      </Button>
                    </Popconfirm>
                  </>
                );
              }
            }}
          />
        </Table>
      </Form>
    </>
  );
};

SprintPage.displayName = 'SprintPage';
export default SprintPage;
