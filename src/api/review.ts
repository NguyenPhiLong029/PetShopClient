import request from 'src/utils/request';

export const getByProductId = (productId: string) => {
  return request('/com/review/product/' + productId, {
    method: 'GET'
  });
};

export const create = (payload: Record<string, any>) => {
  return request('/com/review', {
    method: 'POST',
    body: payload
  });
};

export const getOne = (id: string) => {
  return request(`/com/review/${id}`, {
    method: 'GET'
  });
};

export const get = () => {
  return request('/com/review', {
    method: 'GET'
  });
};

export const remove = (id: string) => {
  return request(`/com/review/${id}`, {
    method: 'DELETE'
  });
};

export const update = (id: string, isPublish: boolean) => {
  return request(`/com/review/${id}`, {
    method: 'PUT',
    body: { isPublish }
  });
};

export default {
  getByProductId,
  create,
  get,
  remove,
  update,
  getOne
};
