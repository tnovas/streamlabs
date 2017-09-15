var chai = require('chai');
var expect = chai.expect;
var request = require('request');
var nock = require('nock');
var StreamLabs = require('../app');

describe('StreamLabs', function() {
	var streamlabs, scope;

	before(function() {
	    streamLabs = new StreamLabs(
			"clientId", 
			"clientSecret", 
			"redirectUrl", 
			"scopes");
	  });


	it('constructor() should make credentials with params', function() {
		var credentials = {
			clientId: "clientId",
			clientSecret: "clientSecret",
			redirectUrl: "redirectUrl",
			scopes: "scopes",
			accessToken: '',
			refreshToken: '',
			socketToken: ''
		};

		var urlApi = {
			base: 'https://www.streamlabs.com/api/v1.0/',
			autorizate: 'authorize',
			accessTokenPath: 'token',
			accessSocketTokenPath: 'socket/token',
			donations: 'donations',
			alerts: 'alerts'
		};
		
		expect(JSON.stringify(streamLabs.__credentials)).to.equal(JSON.stringify(credentials));
		expect(JSON.stringify(streamLabs.__urlApi)).to.equal(JSON.stringify(urlApi));
	});

	it('autorizationUrl() should return Url of autorization', function() {
		expect(streamLabs.autorizationUrl()).to.equal("https://www.streamlabs.com/api/v1.0/authorize?client_id=clientId&redirect__uri=redirectUrl&response_type=code&scope=scopes");
	});

	it('connect() should connect to Api StreamLabs and set credentials access token', function() {
		var scope = nock('https://www.streamlabs.com')
                .post('/api/v1.0/token')
                .reply(200, {access_token: 'token', refresh_token: 'token'});

		streamLabs.connect('code');

		var interval = setInterval(function(){
			if (scope.isDone()) {
				clearInterval(interval);
				expect(streamLabs.__credentials.accessToken).to.equal("token");
			}

		}, 1000)
	});

	it('addDonation() should add donation on StreamLabs and return Id Donation', function() {
		var scope = nock('https://www.streamlabs.com')
                .post('/api/v1.0/donations')
                .reply(200, {id: 1});

		streamLabs.addDonation({}, function(result) {
			expect(result.id).to.equal(1);
		});
	});

	it('getDonations() should get donations', function(){
		var scope = nock('https://www.streamlabs.com')
                .get('/api/v1.0/donations')
                .query({
						access_token: streamLabs.__credentials.accessToken,
  					 	limit: 2,
  						currency: 'USD',
  						verified: false
				  })
                .reply(200, {donation: 2});

		streamLabs.getDonations(2, function(result) {
			expect(result.donation).to.equal(2);
		});
	});

	it('getSocketToken() should get token for websocket', function(){
		var scope = nock('https://www.streamlabs.com')
                .get('/api/v1.0/socket/token')
                .query({
				 	access_token: streamLabs.__credentials.accessToken
				})
                .reply(200, {socket_token: "token"});

		streamLabs.getSocketToken(function(result) {
			expect(result.socket_token).to.equal("token");
		});
	})
});