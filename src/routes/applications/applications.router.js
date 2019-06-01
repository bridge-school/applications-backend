const express = require('express');

const { applicationsController } = require('./applications.controller');
const { applicationsCurrentController } = require('./applications.current.controller');

const router = express.Router();

router.get('', applicationsController);
router.get('/current', applicationsCurrentController);

module.exports = {
  applicationsRouter: router,
};
