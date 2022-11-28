import { Button, Descriptions, Form, Spin, Typography } from 'antd';
import React, { useContext, useEffect, useState } from 'react';
import AppContext, { UserInfo } from '../../hooks/AppContext';
import UploadImage from 'src/components/uploader';
import Avatar from 'src/components/image/avatar';
import EditUseInfoModal from './edit';
import authAPI from 'src/api/auth';
import { useParams } from 'react-router-dom';

export interface UserInfoModel {
  imageUrl: string;
  email: string;
  fullname: string;
  id: string;
  phone: string;
  address: string;
  role: string;
}

const UserInfoPage: React.FC = () => {
  const [userData, setUserData] = useState<UserInfoModel>(null);
  const [openModal, setOpenModal] = useState(false);
  const { id } = useParams();
  const { userInfo } = useContext(AppContext);

  const fetchOne = () => {
    authAPI.getOne(id).then((res) => {
      setUserData(res);
    });
  };

  useEffect(() => {
    fetchOne();
  }, []);

  if (!userData) {
    return <Spin />;
  }

  return (
    <>
      <Typography.Title level={3} style={{ fontWeight: 'bold' }}>
        Thông tin cá nhân
      </Typography.Title>

      <div
        style={{
          width: '100%',
          textAlign: 'center',
          marginTop: 24,
          marginBottom: 48
        }}
      >
        <Avatar src={userData?.imageUrl} style={{ width: 150, height: 150 }} />
      </div>

      <Descriptions layout="vertical" bordered>
        <Descriptions.Item label="Họ và Tên">
          <span style={{ fontWeight: 'bold' }}>{userData?.fullname}</span>
        </Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          <span style={{ fontWeight: 'bold' }}>{userData?.phone}</span>
        </Descriptions.Item>
        <Descriptions.Item label="Email">
          <span style={{ fontWeight: 'bold' }}>{userData?.email}</span>
        </Descriptions.Item>
        <Descriptions.Item label="Địa chỉ">
          <span style={{ fontWeight: 'bold' }}>{userData?.address}</span>
        </Descriptions.Item>
        <Descriptions.Item label="Phân quyền tài khoản">
          <span style={{ fontWeight: 'bold' }}>{userData?.role}</span>
        </Descriptions.Item>
      </Descriptions>

      <div
        style={{
          width: '100%',
          textAlign: 'center',
          marginTop: 24,
          marginBottom: 24
        }}
      >
        <Button
          onClick={() => {
            setOpenModal(true);
          }}
        >
          Chỉnh sửa thông tin
        </Button>
        <EditUseInfoModal
          open={openModal}
          onCancel={() => {
            setOpenModal(false);
          }}
          onReload={() => fetchOne()}
        />
      </div>
    </>
  );
};

UserInfoPage.displayName = 'UserInfoPage';
export default UserInfoPage;
