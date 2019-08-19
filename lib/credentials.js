let credentials = { };

function get() {
  return credentials;
}

function set(newCredentials) {
  credentials = newCredentials;
}

function setSocketToken(socketToken) {
  credentials.socketToken = socketToken;
}

function setUser(user) {
  credentials.user = user;
}

module.exports = {
  get,
  set,
  setUser,
  setSocketToken,
};
