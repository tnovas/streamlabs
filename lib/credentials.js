let credentials = { };

function get() {
  return credentials;
}

function set(newCredentials) {
  credentials = newCredentials;
}

function setUser(user) {
  credentials.user = user;
}

module.exports = {
  get,
  set,
  setUser,
};
