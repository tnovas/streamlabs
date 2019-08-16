const OAuth2 = require('oauth20');
const { streamlabsAPI } = require('./lib/utils/urls');
const { get: getCredentials, set: setCredentials, setSocketToken } = require('./lib/credentials');
const { call: donations } = require('./lib/donations');
const { call: alerts } = require('./lib/alerts');
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
   * There are 2 actions: get / add
   *  - get: recive a number param wich define the limit of donations will return
   *  - add: recive a object param wich define the donation will add
   */
  donation(action, data) {
    return donations(action, data);
  }

  connectWebSocket() {
    return webSocket();
  }

  /**
   * There are 5 actions:
   * 
   * create:    https://dev.streamlabs.com/v1.0/reference#alerts
   * volume: There are 2 internal actions
   *  - mute    https://dev.streamlabs.com/v1.0/reference#alertsmute_volume
   *  - unmute  https://dev.streamlabs.com/v1.0/reference#alertsunmute_volume
   * queue: There are 2 insternal actions
   *  - pause   https://dev.streamlabs.com/v1.0/reference#alertspause_queue
   *  - unpause https://dev.streamlabs.com/v1.0/reference#alertsunpause_queue
   * video: There are 2 internal actions
   *  - show    https://dev.streamlabs.com/v1.0/reference#alertsshow_video
   *  - hide    https://dev.streamlabs.com/v1.0/reference#alertshide_video
   * skip:      https://dev.streamlabs.com/v1.0/reference#alertsskip
   *
   */
  alert(action, data) {
    return alerts(action, data);
  }
}

module.exports = Streamlabs;
