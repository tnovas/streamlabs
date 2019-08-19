const { jar: url } = require('./utils/urls');
const { post: requestPost } = require('./utils/request');

function empty() {
  return requestPost(`${url}/empty`);
}

module.exports = {
  empty,
};
