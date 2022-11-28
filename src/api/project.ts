import { request } from 'src/utils/request';

export const get = () => {
  return request('/project', {
    method: 'GET'
  });
};

export const create = (payload: Record<string, any>) => {
  return request('/project', {
    method: 'POST',
    body: payload
  });
};

export default {
  get,
  create
};
