import {
  Button,
  Col,
  Form,
  Input,
  message,
  Modal,
  notification,
  Radio,
  Row,
  Spin
} from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import AppContext, { UserInfo } from '../../hooks/AppContext';
import authAPI from 'src/api/auth';
import { useNavigate, useParams } from 'react-router-dom';
import { setToken, setUserInfo } from 'src/utils/auth';

interface EditUserInfoProps {
  open: boolean;
  onCancel: () => void;
  onReload: () => void;
}

interface EditUserInfoModel {
  email: string;
  fullname: string;
  id: string;
  phone: string;
  address: string;
}

const EditUseInfoModal: React.FC<EditUserInfoProps> = ({
  open,
  onCancel,
  onReload
}) => {
  const [defaultData, setDefaultData] = useState<EditUserInfoModel>(null);
  const [form] = Form.useForm();
  const { id } = useParams();

  const fetchEdit = () => {
    authAPI.getOne(id).then((res) => {
      setDefaultData(res);
    });
  };

  useEffect(() => {
    fetchEdit();
  }, []);

  const onUpdate = (value) => {
    authAPI.update(id, value).then(() => {
      notification.success({
        message: 'Updated'
      });

      const { access_token, ...user } = value;
      setToken(access_token);
      setUserInfo(user);

      // onReload && onReload();
      onCancel && onCancel();
    });
  };

  const onSave = () => {
    form.validateFields().then((values) => {
      onUpdate(values);

      // form.submit();
    });
  };

  return (
    <>
      <Modal
        open={open}
        title="Chỉnh sửa thông tin cá nhân"
        okText="Chỉnh sửa"
        cancelText="Thoát"
        onCancel={onCancel}
        onOk={onSave}
        width={1400}
        centered
      >
        <Form
          form={form}
          layout="vertical"
          name="form_in_modal"
          initialValues={defaultData}
        >
          <Row gutter={{ xs: 8, sm: 16, md: 24, lg: 32 }}>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="fullname"
                label="Họ và Tên"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="phone"
                label="Số điện thoại"
                rules={[{ required: true }, { min: 10 }, { max: 10 }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="email"
                label="Email"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="address"
                label="Địa chỉ"
                rules={[{ required: true }]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col className="gutter-row" span={8}>
              <Form.Item
                name="passwordHash"
                label="Mật khẩu"
                rules={[{ required: true }]}
              >
                <Input.Password />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
    </>
  );
};

EditUseInfoModal.displayName = 'EditUseInfoModal';
export default EditUseInfoModal;
