import { request } from 'src/utils/request';

export const login = (payload: Record<string, any>) => {
  return request('/auth/login', {
    method: 'POST',
    body: payload
  });
};

export const register = (payload: Record<string, any>) => {
  return request('/auth/register', {
    method: 'POST',
    body: payload
  });
};

export const get = () => {
  return request('/auth', {
    method: 'GET'
  });
};

export const getOne = (id: string) => {
  return request(`/auth/profile/${id}`, {
    method: 'GET'
  });
};

export const remove = (id: string) => {
  return request(`/auth/${id}`, {
    method: 'DELETE'
  });
};

export const update = (id: string, payload: Record<string, any>) => {
  return request(`/auth/${id}`, {
    method: 'PUT',
    body: payload
  });
};

export default {
  login,
  register,
  get,
  remove,
  update,
  getOne
};
