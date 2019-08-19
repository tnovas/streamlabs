const router = require('express').Router();
const streamlabs = require('./streamlabs');

router.get('/spin', (req, res) => {
	streamlabs.wheel.spin().then((result) => res.json(result.data)).catch((err) => res.json(err.response.data));
});

module.exports = router;
