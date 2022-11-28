import { request } from 'src/utils/request';

export const get = () => {
  return request(`/admin/order`, {
    method: 'GET'
  });
};

export const remove = (id: string) => {
  return request(`/admin/order/${id}`, {
    method: 'DELETE'
  });
};

export const create = (payload: Record<string, any>) => {
  return request('/com/order', {
    method: 'POST',
    body: payload
  });
};

export const getById = (id: string) => {
  return request(`/admin/order/${id}`, {
    method: 'GET'
  });
};

export const done = (id: string) => {
  return request(`/admin/order/status/done/${id}`, {
    method: 'PUT'
  });
};

export const deliver = (id: string) => {
  return request(`/admin/order/status/deliver/${id}`, {
    method: 'PUT'
  });
};

export const cancel = (id: string) => {
  return request(`/admin/order/status/cancel/${id}`, {
    method: 'PUT'
  });
};

export default {
  create,
  get,
  remove,
  getById,
  done,
  deliver,
  cancel
};
