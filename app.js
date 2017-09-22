let request = require('request-promise');

class StreamLabs {

	constructor(clientId, clientSecret, redirectUrl, scopes, accessToken='', refreshToken='', socketToken='') {
		this.__credentials = {
			clientId: clientId,
			clientSecret: clientSecret,
			redirectUrl: redirectUrl,
			scopes: scopes,
			accessToken: accessToken,
			refreshToken: refreshToken,
			socketToken: socketToken
		};
		
		this.__urlApi = {
			base: 'https://www.streamlabs.com/api/v1.0/',
			authorizate: 'authorize',
			accessTokenPath: 'token',
			accessSocketTokenPath: 'socket/token',
			donations: 'donations',
			alerts: 'alerts'
		};
	}

	authorizationUrl() {
		return `${this.__urlApi.base}${this.__urlApi.authorizate}?client_id=${this.__credentials.clientId}&redirect_uri=${this.__credentials.redirectUrl}&response_type=code&scope=${this.__credentials.scopes}`;
	}

	getCredentials() {
		return {
			accessToken: this.__credentials.accessToken,
			refreshToken: this.__credentials.refreshToken,
			socketToken: this.__credentials.socketToken
		}
	}

	connect(code, success, error) {
		let url = this.__urlApi.base + this.__urlApi.accessTokenPath;
		let body = {
			grant_type: 'authorization_code',
			client_id: this.__credentials.clientId,
			client_secret: this.__credentials.clientSecret,
			redirect_uri: this.__credentials.redirectUrl,
			code: code
		};

		this.__post(url, body, (result) => {
			this.__credentials.accessToken = result.access_token;
			this.__credentials.refreshToken = result.refresh_token;
			success();
	    }, error);
	}

	getDonations(limit, success, error) {
		let url = this.__urlApi.base + this.__urlApi.donations;
		let qs = {
			access_token: this.__credentials.accessToken,
			limit: limit,
			currency: 'USD',
			verified: false
		};

		this.__get(url, qs, success, error);
	}

	addDonation(donation, success, error) {
		let url = this.__urlApi.base + this.__urlApi.donations;
		donation.access_token = this.__credentials.accessToken;

		this.__post(url, donation, success, error);
	}

	connectWebSocket(success, error) {
		let url = this.__urlApi.base + this.__urlApi.accessSocketTokenPath;
		let qs = {
		 access_token: this.__credentials.accessToken
		};

		this.__get(url, qs, (result) => {
			this.__credentials.socketToken = result.socket_token; 
			success(result.socket_token);
		}, error);
	}

	__get(url, qs, success, error) {
		request({
		    method: 'GET',
		    url: url,
		    qs: qs,
		    json: true
		})
		.then(success)
	    .catch(error);
	}

	__post(url, body, success, error) {
		request({
		    method: 'POST',
		    uri: url,
		    body: body,
		    json: true
		})
		.then(success)
	    .catch(error);
	}
}

module.exports = StreamLabs;