import React from 'react';
// import { Link } from 'react-router-dom';
import { DatePicker, Form, Input, message, Modal, Space } from 'antd';
import UploadImage from 'src/components/uploader';

interface NewSprintProps {
  visible: boolean;
  onCancel: () => void;
  onCreated: () => void;
}

const NewSprint: React.FC<NewSprintProps> = ({
  visible,
  onCancel,
  onCreated
}) => {
  const [form] = Form.useForm();

  const validateForm = async () => {
    await form.validateFields().then(() => {
      form.submit();
    });
  };

  const onFinish = async (values: any) => {
    const { logo, title, start, end } = values;

    // var datestr = new Date().toUTCString();

    const formdata = new FormData();
    formdata.append('title', title);
    formdata.append('startDate', start);
    formdata.append('endDate', end);
    formdata.append('logo', logo[0].originFileObj, logo[0].name);

    const requestOptions = {
      method: 'POST',
      body: formdata
    };

    fetch('http://localhost:9900/sprint', requestOptions)
      .then((response) => response.text())
      .then((result) => {
        message.success('A new sprint Created');
        onCreated && onCreated();
      })
      .catch((error) => console.log('error', error));
  };

  return (
    <Modal
      title="Create Sprint"
      onOk={validateForm}
      visible={visible}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Title"
          hasFeedback
          rules={[{ required: true }, { whitespace: true }, { min: 1 }]}
        >
          <Input maxLength={20} placeholder="Type your title" allowClear />
        </Form.Item>

        <Form.Item style={{ marginBottom: 0 }}>
          <Form.Item
            name="startDate"
            label="Start Date"
            hasFeedback
            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          >
            <DatePicker format={['DD/MM/YYYY', 'DD/MM/YY']} />
          </Form.Item>

          <Form.Item
            name="endDate"
            label="End Date"
            hasFeedback
            style={{ display: 'inline-block', width: 'calc(50% - 12px)' }}
          >
            <DatePicker format={['DD/MM/YYYY', 'DD/MM/YY']} />
          </Form.Item>
        </Form.Item>

        <Form.Item name="logo" label="Upload Image">
          <UploadImage />
        </Form.Item>
      </Form>
    </Modal>
  );
};

NewSprint.displayName = 'NewSprint';
export default NewSprint;
