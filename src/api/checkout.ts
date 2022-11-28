import { request } from 'src/utils/request';

export const getPayment = () => {
  return request(`/com/checkout/payment`, {
    method: 'GET'
  });
};

export const getShipment = () => {
  return request(`/com/checkout/shipment`, {
    method: 'GET'
  });
};

export default {
  getPayment,
  getShipment
};
