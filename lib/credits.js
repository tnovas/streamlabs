const { credits: url } = require('./utils/urls');
const { post: requestPost } = require('./utils/request');

function roll() {
  return requestPost(`${url}/roll`);
}

module.exports = {
  roll,
};
