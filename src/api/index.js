const express = require('express');

const { healthRouter } = require('../routes/health/health.router');
const {
  applicationsRouter,
} = require('../routes/applications/applications.router');

const router = express.Router();
router.use('/health', healthRouter);
router.use('/applications', applicationsRouter);

module.exports = router;
