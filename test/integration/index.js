const express = require('express');
const app = express();

const streamlabs = require('./streamlabs');
const donations = require('./donations');
const alerts = require('./alerts');
const loyalty = require('./loyalty');
const credits = require('./credits');
const jar = require('./jar');
const wheel = require('./wheel');

app.get('/connect', (req, res) => {
	streamlabs.connect(req.query.code).then((result) => res.json(result)).catch((err) => res.json(err.response.data));
});

app.get('/reconnect', (req, res) => {
	streamlabs.reconnect(streamlabs.getCredentials().refreshToken).then((result) => res.json(result.data)).catch((err) => res.json(err.response.data));
});

app.get('/connectSocket', (req, res) => {
	streamlabs.connectWebSocket().then((result) => res.json(result.data)).catch((err) => res.json(err.response.data));
});

app.get('/credentials', (req, res) => {
	res.json(streamlabs.credentials());
});

app.use('/donations', donations);

app.use('/alert', alerts);

app.use('/loyalty', loyalty);

app.use('/credits', credits);

app.use('/jar', jar);

app.use('/wheel', wheel);

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
					<li><a href="/donations/add" target="_blank">Add fake donation</a></li>
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
					<li><a href="/loyalty/subtract" target="_blank">Subtract points to user/s</a></li>
					<li><a href="/loyalty/reset" target="_blank">Reset all points</a></li>
					<li><a href="/loyalty/edit" target="_blank">Edit points to user</a></li>
					<li><a href="/loyalty/get" target="_blank">Get points of user/s</a></li>
					<li><a href="/loyalty/detail" target="_blank">Get detail loyalty of user</a></li>
					<li><a href="/loyalty/query" target="_blank">Search loyalty by order, sort and user</a></li>
					<h3>Credits</h3>
					<li><a href="/credits/roll" target="_blank">Roll credits</a></li>
					<h3>Loyalty</h3>
					<li><a href="/jar/empty" target="_blank">Empty Jar</a></li>
					<h3>Loyalty</h3>
					<li><a href="/wheel/spin" target="_blank">Spin wheel</a></li>
				</ul>
			</body>
		</html>
	`);
});

app.listen(8080);