import axios from 'axios'
import { message } from 'ant-design-vue';

const http = axios.create()
// http request 拦截器
// 每次请求都为http头增加Authorization字段，其内容为Token
http.interceptors.request.use(
  config => {
    const caseId = localStorage.getItem('caseId');

    if (caseId) {
      config.params = config.params || {}
      config.params.caseId = caseId;
    }

    return config;
  },
  error => {
    return Promise.reject(error);
  }
);

// http response 拦截器
http.interceptors.response.use(response => {
  let data = response.data
  if (data.code == 200) {
    return data.data
  }
//   if (data.code === 401) {
//     window.location.href = '/login'
//   }
  message.error(data.message);
  return Promise.reject(data)
}, error => {
  message.error('系统异常');
  return Promise.reject(error)
})

export default http