var chai = require('chai');
var expect = chai.expect;
var StreamLabs = require('../app');
var axios = require('axios');
var MockAdapter = require('axios-mock-adapter');
var mock = new MockAdapter(axios);

describe('StreamLabs', () => {
	var streamlabs, scope, urls, credentials;

	before(() => {
	    streamlabs = new StreamLabs(
			"clientId", 
			"clientSecret", 
			"redirectUrl", 
			"scopes"
		);

	    credentials = {
	    	clientId: "clientId", 
			clientSecret: "clientSecret", 
			redirectUrl: "redirectUrl", 
			scopes: "scopes",
			accessToken: "token",
			socketToken: "socketToken"
	    };

	    urls = {
			base: 'https://www.streamlabs.com/api/v1.0/',
			authorizate: 'authorize',
			token: 'token',
			socketToken: 'socket/token',
			donations: 'donations',
			alerts: 'alerts'
		};
	  });

	it('authorizationUrl() should return Url of authorization', () => 
		expect(streamlabs.authorizationUrl()).to.equal(`${urls.base}${urls.authorizate}?response_type=code&client_id=${credentials.clientId}&redirect_uri=${credentials.redirectUrl}&scope=${credentials.scopes}`)
	);

	it('connect() should connect to streamlabs and get accessToken with code', () => {	
		var credentials = {
			accessToken: 'token',
			refreshToken: 'token',
			expiresIn: 3600,
			socketToken: ''
		};
		
		mock.onPost(urls.token).replyOnce(200, {access_token: 'token', refresh_token: 'token', expires_in: 3600});

		streamlabs.connect('code').then(() => expect(JSON.stringify(streamlabs.getCredentials())).to.equal(JSON.stringify(credentials)));
	});

	it('connect() should throw error with a message', () => {	
		mock.onPost(urls.token).replyOnce(500, { error: 'error' });

		streamlabs.connect('code').catch((err) => expect(500).to.equal(err.response.status));
	});

	it('reconnect() should reconnect to streamlabs and get accessToken with code', () => {	
		var credentials = {
			accessToken: 'token',
			refreshToken: 'token',
			expiresIn: 3600,
			socketToken: ''
		};
		
		mock.onPost(urls.token).replyOnce(200, {access_token: 'token', refresh_token: 'token', expires_in: 3600});

		streamlabs.reconnect('token').then(() => expect(JSON.stringify(streamlabs.getCredentials())).to.equal(JSON.stringify(credentials)));
	});

	it('reconnect() should throw error with a message', () => {	
		mock.onPost(urls.token).replyOnce(500, { error: 'error' });

		streamlabs.reconnect('token').catch((err) => expect(500).to.equal(err.response.status));
	});
	
	it('addDonation() should get Error', function() {
		mock.onPost(urls.donations).replyOnce(500, {error: 'error'});

		streamlabs.addDonation({}).catch((err) => expect(500).to.equal(err.response.status));
	});

	it('addDonation() should add donation on StreamLabs and return Id Donation', function() {
		mock.onPost(urls.donations).replyOnce(200, {id_donation: 1});

		streamlabs.addDonation({}).then((result) =>	expect(result.data.id_donation).to.equal(1));
	});

	it('getDonations() should get donations', function(){
		mock.onGet(urls.donations, {
						access_token: credentials.accessToken,
  					 	limit: 2,
  						currency: 'USD',
  						verified: false
				  }).replyOnce(200, {donations: [ {id: 1}, {id: 2}] });

		streamlabs.getDonations(2).then((result) => expect(result.data.donations.length).to.equal(2));
	});

	it('connectWebSocket() should get error', function(){
		mock.onGet(urls.socketToken).replyOnce(500, { error: 'error' });

		streamlabs.connectWebSocket().catch((err) => expect(500).to.equal(err.response.status));
	});

	it('connectWebSocket() should get token for websocket', function(){
		mock.onGet(urls.socketToken, {
				 	access_token: credentials.accessToken
				}).replyOnce(200, {socket_token: "socketToken"});

		streamlabs.connectWebSocket((result) => expect(result.socket_token).to.equal("socketToken"));
	});

	it('getCredentials() should get credentials', () => {
		var credentials = {
			accessToken: 'token',
			refreshToken: 'token',
			expiresIn: 3600,
			socketToken: 'socketToken'
		};

		var result = streamlabs.getCredentials();

		expect(JSON.stringify(result)).to.equal(JSON.stringify(credentials));
	});
});