const { loyalty: url } = require('../utils/urls');
const { get: requestGet, post: requestPost } = require('../utils/request');

function subtract(channel, user, points) {
  return requestPost(`${url}/subtract`, { channel, username: user, points });
}

/**
 * Doesn't work on Streamlabs API use Edit
 */
function add(channel, users) {
  return requestPost(`${url}/import`, { channel, users });
}

function reset() {
  return requestPost(`${url}/reset`);
}

/**
 * Doesn't work on Streamlabs API
 */
function addAll(channel, points) {
  return requestPost(`${url}/add_to_all`, { channel, value: points });
}

function edit(user, points) {
  return requestPost(`${url}/user_point_edit`, { username: user, points });
}

function get(channel, users) {
  return requestGet(`${url}/group_get_points`, { channel, usernames: users });
}

function detail(channel, user) {
  return requestGet(url, { channel, username: user });
}

function query({ user, sort, order, limit, page }) {
  return requestGet(`${url}/user_points`, { username: user, sort, order, limit, page });
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
