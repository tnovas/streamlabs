const router = require('express').Router();
const streamlabs = require('./streamlabs');

router.get('/roll', (req, res) => {
	streamlabs.credits.roll().then((result) => res.json(result.data)).catch((err) => res.json(err.response.data));
});

module.exports = router;
