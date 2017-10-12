let axios = require('axios');
let OAuth2 = require('oauth20');
let credentialsStreamLabs = Symbol('credentialsStreamLabs');
let urlsStreamLabs = Symbol('urlsStreamLabs');
let getStreamLabs = Symbol('getStreamLabs');
let postStreamLabs = Symbol('postStreamLabs');

class StreamLabs extends OAuth2 {

	constructor(clientId, clientSecret, redirectUrl, scopes, socketToken='') {
		super(clientId, clientSecret, redirectUrl, scopes, 
			'https://www.streamlabs.com/api/v1.0/', 'authorize', 'token');
		
		this[credentialsStreamLabs] = {
			socketToken: socketToken
		};
		
		this[urlsStreamLabs] = {
			socketToken: 'socket/token',
			donations: 'donations',
			alerts: 'alerts'
		};

		axios = axios.create({
		  baseURL: 'https://www.streamlabs.com/api/v1.0/'
		});
	}

	getCredentials() {
		let credentials = super.getCredentials();
		credentials.socketToken = this[credentialsStreamLabs].socketToken;

		return credentials;
	}

	getDonations(limit) {
		let url = this[urlsStreamLabs].donations;
		let params = {
			access_token: this.getCredentials().accessToken,
			limit: limit,
			currency: 'USD',
			verified: false
		};

		return this[getStreamLabs](url, params);
	}

	addDonation(donation) {
		let url = this[urlsStreamLabs].donations;
		donation.access_token = this.getCredentials().accessToken;

		return this[postStreamLabs](url, donation);
	}

	connectWebSocket() {
		let url = this[urlsStreamLabs].socketToken;
		let params = {
		 access_token: this.getCredentials().accessToken
		};

		return this[getStreamLabs](url, params).then((result) => {
			this[credentialsStreamLabs].socketToken = result.data.socket_token; 
			return result;
		});
	}

	[getStreamLabs](url, params) {
		return axios({
		    method: 'GET',
		    url: url,
		    params: params
		});
	}

	[postStreamLabs](url, data) {
		return axios({
		    method: 'POST',
		    url: url,
		    data: data
		});
	}
}

module.exports = StreamLabs;