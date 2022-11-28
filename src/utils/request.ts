import { message } from 'antd';
import { clearAuth, getToken } from './auth';
import history from 'src/utils/history';
import axios from 'axios';

interface RequestOption {
  authorization?: boolean;
  body?: any;
  headers?: Record<string, any>;
  query?: Record<string, any>;
  method: 'GET' | 'POST' | 'PUT' | 'PATCH' | 'DELETE';
}

const RequestMethods = {
  GET: axios.get,
  POST: axios.post,
  PUT: axios.put,
  PATCH: axios.patch,
  DELETE: axios.delete
};

export const buildRequestUrl = (path: string): string => {
  return path.includes('https://') || path.includes('http://')
    ? path
    : process.env.REACT_APP_API_URL + path;
};

const buildHeaders = (options: RequestOption): Record<string, any> => {
  const { authorization = true } = options;
  let headers = {};

  if (authorization) {
    const token = getToken();
    if (token) {
      headers['Authorization'] = 'Bearer ' + token;
    }
  }

  if (options.body instanceof FormData) {
    headers['Accept'] = '*/*';
  } else {
    headers['Accept'] = 'application/json';
    headers['Content-Type'] = 'application/json';
  }

  if (options.headers) {
    for (const key in options.headers) {
      headers = {
        ...headers,
        ...options.headers
      };
    }
  }

  return headers;
};

const buildQuery = (obj) => {
  const params = new URLSearchParams();
  for (const key in obj) {
    params.append(key, obj[key]);
  }
  return params;
};

export const request = async (path: string, option: RequestOption) => {
  let url = buildRequestUrl(path);
  const headers = buildHeaders(option);
  const { method, query, body } = option;
  const req = RequestMethods[method];
  if (query) {
    url = url + buildQuery(query);
  }
  try {
    let res = null;
    if (method === 'GET' || method === 'DELETE') {
      res = await req(url, { headers });
    } else {
      res = await req(url, body || {}, { headers });
    }
    return res.data;
  } catch (err) {
    const status = err.response.status;
    if (status === 401) {
      clearAuth();
      message.info('Hết phiên đăng nhập');
      history.push('/auth/login');
    } else if (status === 403) {
      history.push('/auth/forbidden');
    } else {
      message.error(`Failed: ${method} - ${path}`);
    }
    throw err;
  }
};

export default request;
