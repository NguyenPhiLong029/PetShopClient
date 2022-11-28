import { request } from 'src/utils/request';

export const get = () => {
  return request('/sprint', {
    method: 'GET'
  });
};

export const create = (formValues: Record<string, any>) => {
  // const { logo, title } = formValues;
  // const formData = new FormData();
  // formData.append('title', title);
  // formData.append('logo', logo[0].originFileObj, logo[0].name);
  // return request('/project', {
  //   method: 'POST',
  //   body: formData
  // });
};

export default {
  get,
  create
};
