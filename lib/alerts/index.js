const actions = require('./actions');

function call(action, data = {}) {
  return actions[action](data);
}

module.exports = {
  call,
};
