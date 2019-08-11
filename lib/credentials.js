let credentials = { };

function get() {
  return credentials;
}

function set(newCredentials) {
  credentials = newCredentials;
}

function setSocketToken(token) {
  credentials.socketToken = token;
}

module.exports = {
  get,
  set,
  setSocketToken,
};
