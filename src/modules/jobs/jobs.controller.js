const { getUserUnpaidJobs, payJob } = require('./jobs.service');
const { HTTP_CODE_ERRORS } = require('../../shared/contants');

class JobsService {

  static async handleUnpaidJobsReq(req, res) {
    try {
      const profileId = req.profile.id;
      const jobs = await getUserUnpaidJobs(profileId);

      res.json(jobs);
    } catch (error) {
      const code = error.code || HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR;
      res.status(code).send(error.message);
    }
  }

  static async handleJobPaymentReq(req, res) {
    try {
      const jobId = req.params.id;
      const clientId = req.profile.id;

      const updatedJob = await payJob(jobId, clientId);

      res.json(updatedJob);
    } catch (error) {
      const code = error.code || HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR;
      res.status(code).send(error.message);
    }
  }
}

module.exports = JobsService;