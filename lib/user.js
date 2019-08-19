const { user: url } = require('./utils/urls');
const { get: requestGet } = require('./utils/request');

async function get() {
  const { data } = await requestGet(url);

  return data;
}

module.exports = get;
