var StreamLabs = require('..');
var express = require('express');
var app = express();

let streamlabs = new StreamLabs({
	clientId: "MvaZuJE1VHLIr9mMSwrrbdoSZ236h4yBXxA3xSqI",
	clientSecret: "WxO5GMuSfJkjBOMJNflb7U9d2doCuJXvmbjdoKDA",
	redirectUrl: "http://localhost:8080/connect",
	scopes: "donations.read donations.create alerts.create socket.token"
});

app.get('/connect', (req, res) => {
	streamlabs.connect(req.query.code).then((result) => res.json(result.data)).catch((err) => res.json(err.response.data));
});

app.get('/reconnect', (req, res) => {
	streamlabs.reconnect(streamlabs.getCredentials().refreshToken).then((result) => res.json(result.data)).catch((err) => res.json(err.response.data));
});

app.get('/connectSocket', (req, res) => {
	streamlabs.connectWebSocket().then((result) => res.json(result.data)).catch((err) => res.json(err.response.data));
});

app.get('/getDonations', (req, res) => {
	streamlabs.donation('get', req.query.limit).then((result) => res.json(result.data)).catch((err) => res.json(err.response.data));
});

app.get('/addDonation', (req, res) => {
	streamlabs.donation('add', {
		  name:"Fishstickslol",
		  message:"I love Fishsticks!",
		  identifier:"fishingthesticks@gmail.com",
		  amount:10,
		  currency:"USD",
	})
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

app.get('/credentials', (req, res) => {
	res.json(streamlabs.getCredentials());
})

app.get('/', (req, res) => {
	res.json(streamlabs.authorizationUrl());
});

app.listen(8080);