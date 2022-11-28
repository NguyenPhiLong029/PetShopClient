import React, { useEffect, useState } from 'react';
// // import { Link } from 'react-router-dom';
// import {
//   Button,
//   DatePicker,
//   Divider,
//   Form,
//   Input,
//   message,
//   Popconfirm,
//   Select,
//   Table,
//   Typography,
//   Image
// } from 'antd';
// import {
//   PlusOutlined,
//   EditOutlined,
//   DeleteOutlined,
//   QuestionCircleOutlined
// } from '@ant-design/icons';
// import NewTicket from './create';
// import FormItem from 'antd/lib/form/FormItem';

// interface ItemTicket {
//   _id: string;
//   name: string;
// }

// const { Title } = Typography;
// const { Option } = Select;

// const TicketPage: React.FC = () => {
//   const [visible, setVisible] = useState(false);
//   const [data, setData] = useState([]);
//   const [editRow, setEditRow] = useState(null);
//   const [form] = Form.useForm();

//   const getTicket = () => {
//     fetch('http://localhost:9900/ticket')
//       .then((response) => response.json())
//       .then((posts) => {
//         setData(posts);
//         setVisible(false);
//       })
//       .catch((err) => console.log(err));
//   };

//   useEffect(() => {
//     getTicket();
//   }, []);

//   const onUpdate = async (values: any) => {
//     await fetch('http://localhost:9900/ticket/' + values._id, {
//       method: 'PUT',
//       body: JSON.stringify({ name: values.name }),
//       headers: {
//         'Content-Type': 'application/json',
//         Accept: 'application/json'
//       }
//     })
//       .then((res) => res.json())
//       .then((resutl) => {
//         message.success('Successful Update');
//         setEditRow(null);
//         getTicket();
//       })
//       .catch((err) => console.log(err));
//   };

//   const onDelete = async (_id: string) => {
//     await fetch('http://localhost:9900/ticket/' + _id, {
//       method: 'DELETE'
//     })
//       .then((res) => res.json())
//       .then((resutl) => {
//         message.success('Successful Delete');
//         getTicket();
//       })
//       .catch((err) => console.log(err));
//   };

//   const cancel = () => {
//     setEditRow(null);
//   };

//   return (
//     <>
//       <div className="page-title">
//         <Title level={1}>All tickets</Title>
//         <Button
//           type="primary"
//           shape="circle"
//           size="large"
//           onClick={() => setVisible(true)}
//         >
//           <PlusOutlined />
//         </Button>
//       </div>
//       <Divider />
//       <NewTicket
//         visible={visible}
//         onCancel={() => setVisible(false)}
//         onCreated={() => getTicket()}
//       />
//       <Form form={form} onFinish={onUpdate}>
//         <Table dataSource={data} rowKey="_id">
//           <Table.Column
//             title="Name"
//             dataIndex="title"
//             key="name"
//             render={(name, record: ItemTicket) => {
//               if (editRow === record._id) {
//                 return (
//                   <>
//                     <FormItem name="_id" hidden>
//                       <Input type={'hidden'} />
//                     </FormItem>
//                     <FormItem
//                       name="title"
//                       style={{ marginBottom: 0 }}
//                       rules={[
//                         { required: true },
//                         { whitespace: true },
//                         { min: 5 }
//                       ]}
//                     >
//                       <Input />
//                     </FormItem>
//                   </>
//                 );
//               } else {
//                 return <p style={{ margin: 0 }}>{name}</p>;
//               }
//             }}
//           />

//           <Table.Column
//             title="Type"
//             dataIndex="type"
//             key="type"
//             render={(name, record: ItemTicket) => {
//               if (editRow === record._id) {
//                 return (
//                   <>
//                     <FormItem name="_id" hidden>
//                       <Input type={'hidden'} />
//                     </FormItem>
//                     <FormItem
//                       name="type"
//                       style={{ marginBottom: 0 }}
//                       rules={[
//                         { required: true },
//                         { whitespace: true },
//                         { min: 5 }
//                       ]}
//                     >
//                       <Select defaultValue="Task">
//                         <Option value="Task">{''}</Option>
//                         <Option value="Bug">{''}</Option>
//                       </Select>
//                     </FormItem>
//                   </>
//                 );
//               } else {
//                 return <p style={{ margin: 0 }}>{name}</p>;
//               }
//             }}
//           />

//           <Table.Column
//             title="Date"
//             dataIndex="createdDate"
//             key="date"
//             render={(name, record: ItemTicket) => {
//               if (editRow === record._id) {
//                 return (
//                   <>
//                     <FormItem name="_id" hidden>
//                       <Input type={'hidden'} />
//                     </FormItem>
//                     <FormItem
//                       name="createdDate"
//                       style={{ marginBottom: 0 }}
//                       rules={[
//                         { required: true },
//                         { whitespace: true },
//                         { min: 5 }
//                       ]}
//                     >
//                       <DatePicker style={{ width: '100%' }} />
//                     </FormItem>
//                   </>
//                 );
//               } else {
//                 return <p style={{ margin: 0 }}>{name}</p>;
//               }
//             }}
//           />

//           <Table.Column
//             title="Image"
//             dataIndex="images"
//             key="iamge"
//             render={() => {
//               return (
//                 <Image
//                   width={200}
//                   src="http://localhost:9900/file/KeyTest10.jpg"
//                 />
//               );
//             }}
//           />

//           <Table.Column
//             title="Action"
//             key="action"
//             width="15%"
//             align="center"
//             dataIndex="_id"
//             render={(id, record: ItemTicket) => {
//               if (editRow === record._id) {
//                 return (
//                   <>
//                     <Button
//                       onClick={() => {
//                         form.submit();
//                       }}
//                       style={{ marginRight: 8 }}
//                     >
//                       Save
//                     </Button>
//                     <Button onClick={cancel}>Cancel</Button>
//                   </>
//                 );
//               } else {
//                 return (
//                   <>
//                     <Button
//                       onClick={() => {
//                         setEditRow(record._id);
//                         form.setFieldsValue(record);
//                       }}
//                     >
//                       <EditOutlined />
//                     </Button>
//                     <Popconfirm
//                       title="Sure to delete?"
//                       icon={<QuestionCircleOutlined style={{ color: 'red' }} />}
//                       onConfirm={() => onDelete(id)}
//                       okText="Yes"
//                       cancelText="No"
//                     >
//                       <Button style={{ marginLeft: 6 }}>
//                         <DeleteOutlined style={{ color: 'red' }} />
//                       </Button>
//                     </Popconfirm>
//                   </>
//                 );
//               }
//             }}
//           />
//         </Table>
//       </Form>
//     </>
//   );
// };

// TicketPage.displayName = 'TicketPage';
// export default TicketPage;
