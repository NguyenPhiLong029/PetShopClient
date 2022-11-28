import React from 'react';
// // import { Link } from 'react-router-dom';
// import { DatePicker, Form, Input, message, Modal, Select, Tag } from 'antd';
// import type { CustomTagProps } from 'rc-select/lib/BaseSelect';
// import { BugOutlined } from '@ant-design/icons';
// import TextArea from 'antd/lib/input/TextArea';
// import UploadFile from './uploader';

// const { Option } = Select;

// interface NewTicketProps {
//   visible: boolean;
//   onCancel: () => void;
//   onCreated: () => void;
// }

// const NewTicket: React.FC<NewTicketProps> = ({
//   visible,
//   onCancel,
//   onCreated
// }) => {
//   const [form] = Form.useForm();

//   const validateForm = async () => {
//     await form.validateFields().then(() => {
//       form.submit();
//     });
//   };

//   const onFinish = async (values: any) => {
//     const { images, ...restValues } = values;
//     const formData = new FormData();
//     images.forEach((image) => {
//       formData.append('images', image.originFileObj, image.originFileObj.name);
//     });
//     Object.keys(restValues).forEach((key) => {
//       formData.append(key, restValues[key]);
//     });

//     try {
//       await fetch('http://localhost:9900/ticket', {
//         method: 'POST',
//         body: formData,
//         headers: {
//           'Content-Type': 'multipart/form-data; boundary=something'
//         }
//       });
//       message.success('A new ticket Created');
//       onCreated && onCreated();
//     } catch (error) {}
//   };

//   return (
//     <Modal
//       title="Create Ticket"
//       onOk={validateForm}
//       visible={visible}
//       onCancel={onCancel}
//     >
//       <Form form={form} layout="vertical" onFinish={onFinish}>
//         <Form.Item
//           name="title"
//           label="Name"
//           hasFeedback
//           rules={[{ required: true }, { whitespace: true }, { min: 5 }]}
//         >
//           <Input maxLength={20} placeholder="Type your ticket" allowClear />
//         </Form.Item>

//         <Form.Item
//           name="type"
//           label="Type"
//           hasFeedback
//           rules={[
//             { required: true, message: 'Please select your type ticket!' }
//           ]}
//         >
//           <Select
//             mode="multiple"
//             style={{ width: '100%' }}
//             placeholder="Please select your type ticket"
//             // onChange={handleChange}
//             optionLabelProp="label"
//           >
//             <Option value="Task" label="Task">
//               <div className="demo-option-label-item">Task</div>
//             </Option>
//             <Option value="Bug" label="Bug">
//               <div className="demo-option-label-item">Bug</div>
//             </Option>
//           </Select>
//         </Form.Item>

//         <Form.Item
//           name="description"
//           label="Description"
//           hasFeedback
//           rules={[{ required: true }, { whitespace: true }, { min: 10 }]}
//         >
//           <TextArea
//             maxLength={60}
//             placeholder="Type your description"
//             allowClear
//             showCount
//           />
//         </Form.Item>

//         <Form.Item name="images" label="Upload Image">
//           <UploadFile />
//         </Form.Item>
//       </Form>
//     </Modal>
//   );
// };

// NewTicket.displayName = 'NewTicket';
// export default NewTicket;
