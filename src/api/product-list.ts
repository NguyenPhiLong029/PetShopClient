import { request } from 'src/utils/request';

export const get = () => {
  return request('/com/product-list', {
    method: 'GET'
  });
};

export default {
  get
};
