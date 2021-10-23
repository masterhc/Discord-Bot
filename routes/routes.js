const router = require('express').Router();
const home = require('../controllers/home.js');


router.route('/').get(home.get());

module.exports = router;