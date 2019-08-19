const { wheel: url } = require('./utils/urls');
const { post: requestPost } = require('./utils/request');

function spin() {
  return requestPost(`${url}/spin`);
}

module.exports = {
  spin,
};
