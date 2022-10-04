const bodyParser = require('body-parser')

const router = require('express').Router();

const gqlRoutes = require('./graphql');


router.use('/graphql', gqlRoutes);

module.exports = router;