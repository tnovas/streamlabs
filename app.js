var request = require('request-promise');

class StreamLabs {
	constructor(clientId, clientSecret, redirectUrl, scopes) {
		this.credentials = {
			clientId: clientId,
			clientSecret: clientSecret,
			redirectUrl: redirectUrl,
			scopes: scopes,
			accessToken: '',
			refreshToken: ''
		};
		
		this.urlApi = {
			base: 'https://www.streamlabs.com/api/v1.0/',
			autorizate: 'authorize',
			accessTokenPath: 'token',
			accessSocketTokenPath: 'socket/token',
			donations: 'donations',
			alerts: 'alerts'
		}
	}

	autorizationUrl() {
		return `${this.urlApi.base}${this.urlApi.autorizate}?client_id=${this.credentials.clientId}&redirect_uri=${this.credentials.redirectUrl}&response_type=code&scope=${this.credentials.scopes}`;
	}

	connect(code) {
		request({
		    method: 'POST',
		    uri: this.urlApi.base + this.urlApi.accessTokenPath,
		    body: {
				grant_type: 'authorization_code',
				client_id: this.credentials.clientId,
				client_secret: this.credentials.clientSecret,
				redirect_uri: this.credentials.redirectUrl,
				code: code
			},
		    json: true
		}).then((result) => {
				this.credentials.accessToken = result.access_token;
				this.credentials.refreshToken = result.refresh_token;
		    })
		    .catch(function (err) {
		        console.log(err);
		    });
	}

	addDonation() {
		return '1';
	}
}

module.exports = StreamLabs;