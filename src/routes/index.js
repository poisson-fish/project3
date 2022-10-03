const bodyParser = require('body-parser')

const router = require('express').Router();
router.use(bodyParser.json())

const apiRoutes = require('./api');
const authRoutes = require('./auth');

const { User, Favorites } = require('../models');

//router.use('/api', apiRoutes);
//router.use('/auth', authRoutes);


module.exports = router;