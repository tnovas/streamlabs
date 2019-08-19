const OAuth2 = require('oauth20');
const { streamlabsAPI } = require('./lib/utils/urls');
const { get: getCredentials, set: setCredentials, setUser } = require('./lib/credentials');
const donations = require('./lib/donations');
const alerts = require('./lib/alerts');
const alertsActions = require('./lib/alerts/actions');
const points = require('./lib/loyalty');
const pointsTypes = require('./lib/loyalty/types');
const user = require('./lib/user');
const credits = require('./lib/credits');
const jar = require('./lib/jar');
const wheel = require('./lib/wheel');
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

    this.socketToken = socketToken;

    this.donations = {
      ...donations,
    };

    this.alerts = {
      ...alerts,
      actions: {
        ...alertsActions,
      },
    };

    this.loyalty = {
      ...points,
      types: {
        ...pointsTypes,
      },
    };

    this.credits = {
      ...credits,
    };

    this.jar = {
      ...jar,
    };

    this.wheel = {
      ...wheel,
    };
  }

  /**
   * @param {string} code
   */
  async connect(code) {
    await super.connect(code);

    setCredentials({
      ...super.getCredentials(),
      socketToken: this.socketToken,
    });

    setUser(await user());

    return getCredentials();
  }

  credentials() {
    return getCredentials();
  }

  connectWebSocket() {
    return webSocket();
  }
}

module.exports = Streamlabs;
