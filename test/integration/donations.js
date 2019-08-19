const router = require('express').Router();
const streamlabs = require('./streamlabs');

router.get('/get', (req, res) => {
	streamlabs.donations.get(req.query.limit).then((result) => res.json(result.data)).catch((err) => res.json(err.response.data));
});

router.get('/add', (req, res) => {
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

module.exports = router;
