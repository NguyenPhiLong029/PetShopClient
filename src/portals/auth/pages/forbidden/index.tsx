import { Button, Typography } from 'antd';
import React from 'react';
import { useNavigate } from 'react-router-dom';

const { Title } = Typography;

const ForbiddenPage: React.FC = () => {
  const navigate = useNavigate();

  return (
    <div className="auth-page">
      <Title>Bạn bị hạn chế quyền truy cập</Title>
      <Button onClick={() => navigate('/')}>Trang chủ</Button>
    </div>
  );
};

ForbiddenPage.displayName = 'ForbiddenPage';
export default ForbiddenPage;
