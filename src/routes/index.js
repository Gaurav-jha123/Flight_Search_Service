const express = require('express');
const router = express.Router();

const v1ApiRoutes = require('./v1/index');
//const flightApiRoutes = require('./v1/flightRoutes');
router.use('/v1/', v1ApiRoutes);

module.exports = router;