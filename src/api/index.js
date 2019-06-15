const express = require('express');

const {
  applicationsRouter,
} = require('../routes/applications/applications.router');

const router = express.Router();
router.use('/applications', applicationsRouter);

module.exports = router;
