var StreamLabs = require('..');
var express = require('express');
var app = express();

let streamlabs = new StreamLabs({
	clientId: "MvaZuJE1VHLIr9mMSwrrbdoSZ236h4yBXxA3xSqI",
	clientSecret: "WxO5GMuSfJkjBOMJNflb7U9d2doCuJXvmbjdoKDA",
	redirectUrl: "http://localhost:8080/connect",
	scopes: "donations.read donations.create alerts.create socket.token alerts.write points.write"
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

app.get('/donations/get', (req, res) => {
	streamlabs.donations.get(req.query.limit).then((result) => res.json(result.data)).catch((err) => res.json(err.response.data));
});

app.get('/donation/add', (req, res) => {
	streamlabs.donations.add({
		  name:"Fishstickslol",
		  message:"I love Fishsticks!",
		  identifier:"fishingthesticks@gmail.com",
		  amount:10,
		  currency:"USD",
	})
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

app.get('/alert/create', (req, res) => {
	streamlabs.alerts.create({
		type: "donation",
		message: "simple geometry",
		user_message: "I am second heading",
	})
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

app.get('/alert/volume/mute', (req, res) => {
	streamlabs.alerts.volume(streamlabs.alerts.actions.volume.mute)
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

app.get('/alert/volume/unmute', (req, res) => {
	streamlabs.alerts.volume(streamlabs.alerts.actions.volume.unmute)
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

app.get('/alert/queue/pause', (req, res) => {
	streamlabs.alerts.queue(streamlabs.alerts.actions.queue.pause)
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

app.get('/alert/queue/unpause', (req, res) => {
	streamlabs.alerts.queue(streamlabs.alerts.actions.queue.unpause)
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

app.get('/alert/video/show', (req, res) => {
	streamlabs.alerts.video(streamlabs.alerts.actions.video.show)
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

app.get('/alert/video/hide', (req, res) => {
	streamlabs.alerts.video(streamlabs.alerts.actions.video.hide)
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

app.get('/alert/skip', (req, res) => {
	streamlabs.alerts.skip()
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

app.get('/credentials', (req, res) => {
	res.json(streamlabs.credentials());
});

app.get('/loyalty/subtract', (req, res) => {
	streamlabs.loyalty.subtract('chimorinkari', 'ChimoTW')
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

app.get('/user', (req, res) => {
	streamlabs.user()
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

app.get('/', (req, res) => {
	res.send(`
		<html>
			<body>
				<ul>
					<h3>Autorization</h3>
					<li><a href="${streamlabs.authorizationUrl()}" target="_blank">Autorization</a></li>
					<h3>Credentials</h3>
					<li><a href="/credentials" target="_blank">Get credentials</a></li>
					<h3>Donations</h3>
					<li><a href="/donations/get?limit=10" target="_blank">Get 10 Donations</a></li>
					<li><a href="/donation/add" target="_blank">Add fake donation</a></li>
					<h3>Alerts</h3>
					<li><a href="/alert/create" target="_blank">Create fake alert</a></li>
					<li><a href="/alert/skip" target="_blank">Skip alerts</a></li>
					<li><a href="/alert/volume/mute" target="_blank">Mute volume alert</a></li>
					<li><a href="/alert/volume/unmute" target="_blank">Unmute volume alert</a></li>
					<li><a href="/alert/queue/pause" target="_blank">Pause queue alerts</a></li>
					<li><a href="/alert/queue/unpause" target="_blank">Unpause queue alerts</a></li>
					<li><a href="/alert/video/show" target="_blank">Show media sharing video</a></li>
					<li><a href="/alert/video/hide" target="_blank">Hide media sharing video</a></li>
					<h3>Loyalty</h3>
					<li><a href="/loyalty/subtract" target="_blank">Subtract points</a></li>
					<h3>User</h3>
					<li><a href="/user" target="_blank">User</a></li>
				</ul>
			</body>
		</html>
	`);
});

app.listen(8080);