import { request } from 'src/utils/request';

export const get = () => {
  return request('/admin/category', {
    method: 'GET'
  });
};

export const getOne = (id: string) => {
  return request(`/admin/category/${id}`, {
    method: 'GET'
  });
};

export const create = (payload: Record<string, any>) => {
  const formData = new FormData();
  formData.append('image', payload.image?.[0].originFileObj);
  formData.append('title', payload.title);

  return request('/admin/category', {
    method: 'POST',
    body: formData
  });
};

export const update = (id: string, payload: Record<string, any>) => {
  const formData = new FormData();
  formData.append('image', payload.image?.[0].originFileObj);
  formData.append('title', payload.title);

  if (payload.imageUrl) {
    formData.append('imageUrl', payload.imageUrl);
  }

  return request(`/admin/category/${id}`, {
    method: 'PUT',
    body: formData
  });
};

export const remove = (id: string, imageUrl?: string) => {
  return request(`/admin/category/${id}?imageUrl=${imageUrl}`, {
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
