const { donations: url } = require('../utils/urls');
const { get: requestGet, post: requestPost } = require('../utils/request');

function add(donation) {
  return requestPost(url, donation);
}

function get(limit) {
  const params = {
    limit,
    currency: 'USD',
    verified: false,
  };

  return requestGet(url, params);
}

module.exports = {
  add,
  get,
};
