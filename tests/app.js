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
			refreshToken: ''
		};
		
		expect(JSON.stringify(streamLabs.credentials)).to.equal(JSON.stringify(credentials));
	});

	it('autorizationUrl() should return Url of autorization', function() {
		expect(streamLabs.autorizationUrl()).to.equal("https://www.streamlabs.com/api/v1.0/authorize?client_id=clientId&redirect_uri=redirectUrl&response_type=code&scope=scopes");
	});

	it('urlApi should return Urls base of StreamLabs', function() {
		var urlApi = {
			base: 'https://www.streamlabs.com/api/v1.0/',
			autorizate: 'authorize',
			accessTokenPath: 'token',
			accessSocketTokenPath: 'socket/token',
			donations: 'donations',
			alerts: 'alerts'
		}
		expect(JSON.stringify(streamLabs.urlApi)).to.equal(JSON.stringify(urlApi));
	});

	it('connect() should connect to Api StreamLabs and set credentials access token', function() {
		var scope = nock('https://www.streamlabs.com')
                .post('/api/v1.0/token')
                .reply(200, {access_token: 'token', refresh_token: 'token'});

		streamLabs.connect('code');

		var interval = setInterval(function(){
			if (scope.isDone()) {
				clearInterval(interval);
				expect(streamLabs.credentials.accessToken).to.equal("token");
			}

		}, 1000)
	});

	it('addDonation() should add donation on StreamLabs and return Id Donation', function() {
		expect(streamLabs.addDonation()).to.equal("1");
	});
});