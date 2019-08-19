var StreamLabs = require('../../');

const streamlabs = new StreamLabs({
	clientId: "MvaZuJE1VHLIr9mMSwrrbdoSZ236h4yBXxA3xSqI",
	clientSecret: "WxO5GMuSfJkjBOMJNflb7U9d2doCuJXvmbjdoKDA",
	redirectUrl: "http://localhost:8080/connect",
	scopes: "donations.read donations.create alerts.create socket.token alerts.write points.write points.read credits.write jar.write wheel.write"
});

module.exports = streamlabs;