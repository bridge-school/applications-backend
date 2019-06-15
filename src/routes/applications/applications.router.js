const express = require('express');

const { allApplications } = require('./controller/allApplications');
const { currentApplications } = require('./controller/currentApplications');
const { singleApplication } = require('./controller/singleApplication');
const { createApplication } = require('./controller/createApplication');
const { applicationSlug } = require('./controller/applicationSlug');
const { studentSubmission } = require('./controller/studentSubmission');

const router = express.Router();

router.get('/', allApplications);
router.post('/', createApplication);

router.get('/slug/:slug', applicationSlug);
router.get('/current', currentApplications);
router.get('/:applicationId', singleApplication); //  /applications/DM7kUT8CCS8tE9wzn9pv

router.post('/apply', studentSubmission);

module.exports = {
  applicationsRouter: router,
};
