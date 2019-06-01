const express = require('express');

const { applicationsController } = require('./applications.controller');
const { applicationsCurrentController } = require('./applications.current.controller');
const { applicationsSingleController } = require('./applications.single.controller');

const router = express.Router();

router.get('/current', applicationsCurrentController);
router.get('/:applicationId', applicationsSingleController); //applications/ILSs8fqjvp79QgVfsqXk
router.get('', applicationsController);

module.exports = {
  applicationsRouter: router,
};
