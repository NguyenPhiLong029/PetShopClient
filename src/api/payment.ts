import { request } from 'src/utils/request';

export const get = () => {
  return request('/admin/payment', {
    method: 'GET'
  });
};

export const getOne = (id: string) => {
  return request(`/admin/payment/${id}`, {
    method: 'GET'
  });
};

export const create = (payload: Record<string, any>) => {
  return request('/admin/payment', {
    method: 'POST',
    body: payload
  });
};

export const update = (id: string, payload: Record<string, any>) => {
  return request(`/admin/payment/${id}`, {
    method: 'PUT',
    body: payload
  });
};

export const remove = (id: string) => {
  return request(`/admin/payment/${id}`, {
    method: 'DELETE'
  });
};

export default {
  get,
  getOne,
  create,
  update,
  remove
};
