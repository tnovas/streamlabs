var request = require('request-promise');

class StreamLabs {
	constructor(clientId, clientSecret, redirectUrl, scopes) {
		this._credentials = {
			clientId: clientId,
			clientSecret: clientSecret,
			redirectUrl: redirectUrl,
			scopes: scopes,
			accessToken: '',
			refreshToken: ''
		};
		
		this._urlApi = {
			base: 'https://www.streamlabs.com/api/v1.0/',
			autorizate: 'authorize',
			accessTokenPath: 'token',
			accessSocketTokenPath: 'socket/token',
			donations: 'donations',
			alerts: 'alerts'
		}
	}

	autorizationUrl() {
		return `${this._urlApi.base}${this._urlApi.autorizate}?client_id=${this._credentials.clientId}&redirect_uri=${this._credentials.redirectUrl}&response_type=code&scope=${this._credentials.scopes}`;
	}

	connect(code) {
		let url = this._urlApi.base + this._urlApi.accessTokenPath;
		let body = {
			grant_type: 'authorization_code',
			client_id: this._credentials.clientId,
			client_secret: this._credentials.clientSecret,
			redirect_uri: this._credentials.redirectUrl,
			code: code
		};

		this._post(url, body, (result) => {
			this._credentials.accessToken = result.access_token;
			this._credentials.refreshToken = result.refresh_token;
	    });
	}

	getDonations(limit, callback) {
		let url = this._urlApi.base + this._urlApi.donations;
		let qs = {
			access_token: this._credentials.accessToken,
			limit: limit,
			currency: 'USD',
			verified: false
		};

		this._get(url, qs, callback);
	}

	_get(url, qs, callback) {
		request({
		    method: 'GET',
		    url: url,
		    qs: qs,
		    json: true
		})
		.then(callback)
	    .catch(function (err) {
	        console.log(err);
	    });
	}

	_post(url, body, callback) {
		request({
		    method: 'POST',
		    uri: url,
		    body: body,
		    json: true
		})
		.then(callback)
	    .catch(function (err) {
	        console.log(err);
	    });
	}
}

module.exports = StreamLabs;