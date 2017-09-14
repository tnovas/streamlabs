var chai = require('chai');
var expect = chai.expect;
var StreamLabs = require('../app');

describe('StreamLabs', function() {
	var streamLabs;

	beforeEach(function() {
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
			scopes: "scopes"
		};
		
		expect(JSON.stringify(streamLabs.credentials)).to.equal(JSON.stringify(credentials));
	});

	it('autorizationUrl() should return Url of autorization', function() {
		expect(streamLabs.autorizationUrl()).to.equal("${this.urlApi.base}${this.urlApi.autorizate}?client_id=${this.credentials.clientId}&redirect_uri=${this.credentials.redirectUri}&response_type=code&scope=${credentials.scopes}");
	});

	it('connect() should return true', function() {
		expect(streamLabs.connect()).to.equal(true);
	});
});