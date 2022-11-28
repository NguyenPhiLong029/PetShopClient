import React from 'react';
import { Form, Input, message, Modal } from 'antd';
import UploadImage from 'src/components/uploader';
import projectAPI from 'src/api/project';

interface NewProjectProps {
  visible: boolean;
  onCancel: () => void;
  onCreated: () => void;
}

const NewProject: React.FC<NewProjectProps> = ({
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

  const onFinish = (values: any) => {
    projectAPI.create(values).then(() => {
      message.success('A new project Created');
      onCreated && onCreated();
    });
  };

  return (
    <Modal
      title="Create Project"
      onOk={validateForm}
      visible={visible}
      onCancel={onCancel}
    >
      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          name="title"
          label="Name Project"
          hasFeedback
          rules={[{ required: true }, { whitespace: true }, { min: 1 }]}
        >
          <Input maxLength={20} placeholder="Type your project" allowClear />
        </Form.Item>

        <Form.Item name="logo" label="Upload Image">
          <UploadImage />
        </Form.Item>
      </Form>
    </Modal>
  );
};

NewProject.displayName = 'NewProject';
export default NewProject;
