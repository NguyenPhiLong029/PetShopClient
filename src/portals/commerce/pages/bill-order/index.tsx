import { Button, Result, Steps } from 'antd';
import React from 'react';
import { Link } from 'react-router-dom';

const Connfirm: React.FC = () => (
  <Result
    status="success"
    title="Đặt hàng thành công!"
    subTitle="Cảm ơn bạn đã tin tưởng và mua hàng ở Shop."
    extra={[
      <Steps current={0} style={{ marginBottom: 48, marginTop: 48 }}>
        <Steps.Step title="Chờ xác nhận" />
        <Steps.Step title="Chờ lấy hàng" />
        <Steps.Step title="Đang giao" />
        <Steps.Step title="Đã giao" />
        <Steps.Step title="Đã hủy" />
        <Steps.Step title="Trả hàng" />
      </Steps>,
      <Link to={'/'}>
        <Button type="primary" key="buy">
          Tiếp tục mua hàng
        </Button>
      </Link>
      // <Button key="bill">Xuất hóa đơn</Button>
    ]}
  />
);

Connfirm.displayName = 'Connfirm';
export default Connfirm;
