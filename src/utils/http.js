import axios from "./axios";

export default {
  //get请求
  get(url, param, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: "get",
        url,
        params: param,
        ...config,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  //post请求
  post(url, param, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: "post",
        url,
        data: param,
        ...config,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  put(url, param, config = {}) {
    return new Promise((resolve, reject) => {
      axios({
        method: "put",
        url,
        data: param,
        ...config,
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    });
  },
  delete(url, param, config={}) {
    return new Promise((resolve, reject) => {
      axios({
        method: 'delete',
        url,
        params: param,
        ...config
      })
        .then((res) => {
          resolve(res);
        })
        .catch((err) => {
          reject(err);
        });
    })
  }
};
