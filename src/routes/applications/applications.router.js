const express = require('express');

const { allApplications } = require('./controller/allApplications');
const { currentApplications } = require('./controller/currentApplications');
const { singleApplication } = require('./controller/singleApplication');
const { createApplication } = require('./controller/createApplication');

const router = express.Router();

router.post('/', createApplication);

router.get('/current', currentApplications);
router.get('/:applicationId', singleApplication); //  /applications/DM7kUT8CCS8tE9wzn9pv
router.get('/', allApplications);

module.exports = {
  applicationsRouter: router,
};
