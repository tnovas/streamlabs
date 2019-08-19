var StreamLabs = require('../../');

const streamlabs = new StreamLabs({
	clientId: "clientId",
	clientSecret: "clientSecret",
	redirectUrl: "http://localhost:8080/connect",
	scopes: "donations.read donations.create alerts.create socket.token alerts.write points.write points.read credits.write jar.write wheel.write"
});

module.exports = streamlabs;