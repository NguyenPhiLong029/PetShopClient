import { request } from 'src/utils/request';

export const getByProduct = (productId: string) => {
  return request(`/admin/variant?productId=${productId}`, {
    method: 'GET'
  });
};

export const getOne = (id: string) => {
  return request(`/admin/variant/${id}`, {
    method: 'GET'
  });
};

export const create = (payload: Record<string, any>) => {
  const formData = new FormData();
  formData.append('image', payload.image?.[0].originFileObj);
  formData.append('title', payload.title);
  formData.append('sku', payload.sku);
  formData.append('stock', payload.stock);
  formData.append('price', payload.price);
  formData.append('weight', payload.weight);
  formData.append('option1Id', payload.option1Id);
  formData.append('option2Id', payload.option2Id);
  formData.append('option3Id', payload.option3Id);
  formData.append('productId', payload.productId);

  return request('/admin/variant', {
    method: 'POST',
    body: formData
  });
};

export const update = (id: string, payload: Record<string, any>) => {
  const formData = new FormData();
  formData.append('image', payload.image?.[0].originFileObj);
  formData.append('title', payload.title);
  formData.append('sku', payload.sku);
  formData.append('stock', payload.stock);
  formData.append('price', payload.price);
  formData.append('weight', payload.weight);
  formData.append('option1Id', payload.option1Id);
  formData.append('option2Id', payload.option2Id);
  formData.append('option3Id', payload.option3Id);
  formData.append('productId', payload.productId);

  if (payload.imageUrl) {
    formData.append('imageUrl', payload.imageUrl);
  }

  return request(`/admin/variant/${id}`, {
    method: 'PUT',
    body: formData
  });
};

export const remove = (id: string, imageUrl?: string) => {
  return request(`/admin/variant/${id}?imageUrl=${imageUrl}`, {
    method: 'DELETE'
  });
};

export default {
  getByProduct,
  getOne,
  create,
  update,
  remove
};
