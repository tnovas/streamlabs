const router = require('express').Router();
const streamlabs = require('./streamlabs');

router.get('/create', (req, res) => {
	streamlabs.alerts.create({
		type: streamlabs.alerts.types.donation,
		message: "simple geometry",
		user_message: "I am second heading",
	})
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

router.get('/volume/mute', (req, res) => {
	streamlabs.alerts.volume(streamlabs.alerts.actions.volume.mute)
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

router.get('/volume/unmute', (req, res) => {
	streamlabs.alerts.volume(streamlabs.alerts.actions.volume.unmute)
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

router.get('/queue/pause', (req, res) => {
	streamlabs.alerts.queue(streamlabs.alerts.actions.queue.pause)
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

router.get('/queue/unpause', (req, res) => {
	streamlabs.alerts.queue(streamlabs.alerts.actions.queue.unpause)
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

router.get('/video/show', (req, res) => {
	streamlabs.alerts.video(streamlabs.alerts.actions.video.show)
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

router.get('/video/hide', (req, res) => {
	streamlabs.alerts.video(streamlabs.alerts.actions.video.hide)
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

router.get('/skip', (req, res) => {
	streamlabs.alerts.skip()
	.then((result) => res.json(result.data))
	.catch((err) => res.json(err.response.data));
});

module.exports = router;
