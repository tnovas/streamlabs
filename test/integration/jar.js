const router = require('express').Router();
const streamlabs = require('./streamlabs');

router.get('/empty', (req, res) => {
	streamlabs.jar.empty().then((result) => res.json(result.data)).catch((err) => res.json(err.response.data));
});

module.exports = router;
