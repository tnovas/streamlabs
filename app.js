let axios = require('axios');
let OAuth2 = require('oauth20');
let credentialsST = Symbol('credentialsST');
let urls = Symbol('urls');
let get = Symbol('get');
let post = Symbol('post');

class StreamLabs extends OAuth2 {

	constructor(clientId, clientSecret, redirectUrl, scopes, accessToken='', refreshToken='', socketToken='') {
		super(clientId, clientSecret, redirectUrl, scopes, 'https://www.streamlabs.com/api/v1.0/', 'authorize', 'token');
		
		this[credentialsST] = {
			socketToken: socketToken
		};
		
		this[urls] = {
			base: 'https://www.streamlabs.com/api/v1.0/',
			socketToken: 'socket/token',
			donations: 'donations',
			alerts: 'alerts'
		};

		axios.defaults.baseurl = this[urls].base;
	}

	getCredentials() {
		let credentials = super.getCredentials();
		credentials.socketToken = this[credentialsST].socketToken;
		return credentials;
	}

	getDonations(limit) {
		let url = this[urls].donations;
		let params = {
			access_token: this.getCredentials().accessToken,
			limit: limit,
			currency: 'USD',
			verified: false
		};

		return this[get](url, params);
	}

	addDonation(donation) {
		let url = this[urls].donations;
		donation.access_token = this.getCredentials().accessToken;

		return this[post](url, donation);
	}

	connectWebSocket() {
		let url = this[urls].socketToken;
		let params = {
		 access_token: this.getCredentials().accessToken
		};

		return this[get](url, params).then((result) => {
			this[credentialsST].socketToken = result.data.socket_token; 
		});
	}

	[get](url, params) {
		return axios({
		    method: 'GET',
		    url: url,
		    params: params
		});
	}

	[post](url, data) {
		return axios({
		    method: 'POST',
		    url: url,
		    data: data
		});
	}
}

module.exports = StreamLabs;