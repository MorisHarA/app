import 'isomorphic-fetch';
import Auth from 'authorize';
import { ApolloClient } from 'apollo-client';
import { HttpLink } from 'apollo-link-http';
import { InMemoryCache } from 'apollo-cache-inmemory';
import Message from 'iview/src/components/message';
import axios from 'axios';
import store from '../store';


const handleErrorStatus = (status) => {
  store.commit({ type: 'loading/SET_LOADING', loading: false });
  const errMessage = {
    403: '禁止访问',
    404: '未找到数据',
    500: '服务器挂掉啦',
    502: '错误请求',
    503: '服务不可用',
  };
  if (status === 401) {
    Auth.unauthorized();
    return;
  }
  if (Object.keys(errMessage).indexOf(`${status}`) > -1) {
    Message.error(`${status} ${errMessage[status]}`);
  }
};

axios.interceptors.request.use((config) => {
  const cfg = { ...config };
  cfg.headers.token = localStorage.token || '';
  return cfg;
}, error => Promise.reject(error));


axios.interceptors.response.use(res => res, (error) => {
  handleErrorStatus(error.response.status);
  return Promise.reject(error);
});

const check = (res) => {
  if (res.status >= 200 && res.status < 300) {
    return res;
  }
  handleErrorStatus(res.status);
  return Promise.reject({ status: res.status });
};

const httpLink = new HttpLink({
  uri: '/wise/dmarket/graph',
  fetch: (url, options) => {
    const opts = { ...options };
    opts.headers = {
      ...opts.headers,
      Token: localStorage.token || '',
      Accept: 'application/json',
      'Content-Type': 'application/json',
    };
    return fetch(url, opts)
      .then(check);
  },
});

export const client = new ApolloClient({
  link: httpLink,
  cache: new InMemoryCache(),
  connectToDevTools: true,
});

export default axios;
