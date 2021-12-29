const { Router } = require('express');
const { getProfile } = require('../../middleware/getProfile');
const JobsController = require('./jobs.controller');

const router = Router();

module.exports = (app) => {
  app.use('/jobs', router);

  router.get('/unpaid', getProfile, JobsController.handleUnpaidJobsReq);
  router.post('/:id/pay', getProfile, JobsController.handleJobPaymentReq);
};