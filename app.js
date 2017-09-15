var request = require('request-promise');

class StreamLabs {

	constructor(clientId, clientSecret, redirectUrl, scopes) {
		this.__credentials = {
			clientId: clientId,
			clientSecret: clientSecret,
			redirectUrl: redirectUrl,
			scopes: scopes,
			accessToken: '',
			refreshToken: '',
			socketToken: ''
		};
		
		this.__urlApi = {
			base: 'https://www.streamlabs.com/api/v1.0/',
			autorizate: 'authorize',
			accessTokenPath: 'token',
			accessSocketTokenPath: 'socket/token',
			donations: 'donations',
			alerts: 'alerts'
		}
	}

	autorizationUrl() {
		return `${this.__urlApi.base}${this.__urlApi.autorizate}?client_id=${this.__credentials.clientId}&redirect__uri=${this.__credentials.redirectUrl}&response_type=code&scope=${this.__credentials.scopes}`;
	}

	connect(code) {
		let url = this.__urlApi.base + this.__urlApi.accessTokenPath;
		let body = {
			grant_type: 'authorization__code',
			client_id: this.__credentials.clientId,
			client_secret: this.__credentials.clientSecret,
			redirect__uri: this.__credentials.redirectUrl,
			code: code
		};

		this.__post(url, body, (result) => {
			this.__credentials.accessToken = result.access_token;
			this.__credentials.refreshToken = result.refresh_token;
	    });
	}

	getDonations(limit, callback) {
		let url = this.__urlApi.base + this.__urlApi.donations;
		let qs = {
			access_token: this.__credentials.accessToken,
			limit: limit,
			currency: 'USD',
			verified: false
		};

		this.__get(url, qs, callback);
	}

	addDonation(donation, callback) {
		let url = this.__urlApi.base + this.__urlApi.donations;
		donation.access_token = this.__credentials.accessToken;

		this.__post(url, donation, callback);
	}

	getSocketToken(callback) {
		let url = this.__urlApi.base + this.__urlApi.accessSocketTokenPath;
		let qs = {
		 access_token: this.__credentials.accessToken
		};

		this.__get(url, qs, (result) => {
			this.__credentials.socketToken = result.socket_token; 
			callback(result);
		});
	}

	__get(url, qs, callback) {
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

	__post(url, body, callback) {
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