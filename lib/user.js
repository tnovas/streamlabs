const { user: url } = require('./utils/urls');
const { get: requestGet } = require('./utils/request');

function get() {
  return requestGet(url, {});
}

module.exports = get;
