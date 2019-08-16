const axios = require('axios');
const { get: getCredentials } = require('./credentials');
const { streamlabsAPI } = require('./utils/urls');

const axiosInstance = axios.create({
  baseURL: streamlabsAPI,
});

function get(url, params) {
  return axiosInstance({
    method: 'GET',
    url,
    params: {
      ...params,
      access_token: getCredentials().accessToken,
    },
  });
}

function post(url, data = {}) {
  return axiosInstance({
    method: 'POST',
    url,
    data: {
      ...data,
      access_token: getCredentials().accessToken,
    },
  });
}

module.exports = {
  get,
  post,
};
