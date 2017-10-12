var StreamLabs = require('../app');
var express = require('express');
var app = express();

let streamlabs = new StreamLabs(
		"clientId", 
		"clientSecret", 
		"http://localhost:8080/connect", 
		"donations.read donations.create alerts.create socket.token"
);

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
	streamlabs.getDonations(req.query.limit).then((result) => res.json(result.data)).catch((err) => res.json(err.response.data));
});

app.get('/addDonation', (req, res) => {
	streamlabs.addDonation({
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