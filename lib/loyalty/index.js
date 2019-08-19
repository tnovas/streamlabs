const { loyalty: url } = require('../utils/urls');
const { get: requestGet, post: requestPost } = require('../utils/request');

function subtract(channel, users) {
  return requestPost(`${url}/group_subtract_points`, { channel, users });
}

function add(channel, users) {
  return requestPost(`${url}/import`, { channel, users });
}

function reset() {
  return requestPost(`${url}/reset`);
}

function addAll(channel, points) {
  return requestPost(`${url}/add_to_all`, { channel, points });
}

function edit(user, points) {
  return requestPost(`${url}/user_point_edit`, { user, points });
}

function get(channel, users) {
  return requestGet(`${url}/group_get_points`, { channel, users });
}

function detail(channel, user) {
  return requestGet(url, { channel, user });
}

function query({ user, sort, order, limit, page }) {
  return requestGet(`${url}/user_points`, { user, sort, order, limit, page });
}

module.exports = {
  add,
  get,
  detail,
  reset,
  edit,
  subtract,
  addAll,
  query,
};
