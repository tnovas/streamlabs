const OAuth2 = require('oauth20');
const { streamlabsAPI } = require('./lib/utils/urls');
const { get: getCredentials, set: setCredentials, setSocketToken } = require('./lib/credentials');
const { add: addDonation, get: getDonations } = require('./lib/donations');
const webSocket = require('./lib/socket');

/**
 * Object param ->
 *    @param {string} clientId
 *    @param {string} clientSecret
 *    @param {string} redirectUrl
 *    @param {string} scopes
 *    @param {string} socketToken
 *    @param {string} accessToken 
 */
class Streamlabs extends OAuth2 {
  constructor({
    clientId, clientSecret, redirectUrl, scopes, socketToken = '', accessToken = '',
  }) {
    super(clientId, clientSecret, redirectUrl, scopes, accessToken, streamlabsAPI);

    setSocketToken(socketToken);
  }

  /**
   * 
   * @param {string} code 
   */
  async connect(code) {
    const result = await super.connect(code);
    setCredentials(super.getCredentials());

    return result;
  }

  getCredentials() {
    return getCredentials();
  }

  /**
   * 
   * @param {object} donation: ->
   *    @param {sting} name
   *    @param {string} message
   *    @param {string} identifier
   *    @param {double} amount
   *    @param {string} currency
   * }
   */
  addDonation(donation) {
    return addDonation(donation);
  }

  /**
   * 
   * @param {integer} limit 
   */
  getDonations(limit) {
    return getDonations(limit);
  }

  connectWebSocket() {
    return webSocket();
  }
}

module.exports = Streamlabs;
