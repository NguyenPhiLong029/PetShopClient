import { request } from 'src/utils/request';

export const get = (productId: string) => {
  return request(`/com/detail/${productId}`, {
    method: 'GET'
  });
};

export default {
  get
};
