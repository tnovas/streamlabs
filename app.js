class StreamLabs {
	constructor(clientId, clientSecret, redirectUrl, scopes) {
		this.credentials = {
			clientId: clientId,
			clientSecret: clientSecret,
			redirectUrl: redirectUrl,
			scopes: scopes
		};
		
		this.urlApi = {
			base: 'https://www.streamlabs.com/api/v1.0/',
			autorizate: 'authorize'
		}
	}

	autorizationUrl() {
		return '${this.urlApi.base}${this.urlApi.autorizate}?client_id=${this.credentials.clientId}&redirect_uri=${this.credentials.redirectUri}&response_type=code&scope=${credentials.scopes}';
	}

	connect() {
		return true;
	}
}

module.exports = StreamLabs;