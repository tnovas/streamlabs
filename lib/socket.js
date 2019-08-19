const { socketToken: url } = require('./utils/urls');
const { get: requestGet } = require('./utils/request');
const { setSocketToken: setCredential } = require('./credentials');

async function get() {
  const result = await requestGet(url);
  setCredential(result.data.socket_token);
  return result;
}

module.exports = get;
