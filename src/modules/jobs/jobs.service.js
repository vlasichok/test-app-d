const { Op } = require('sequelize');
const { Contract, Job, Profile, sequelize } = require('../../model');
const { CONTRACT_STATUS, HTTP_CODE_ERRORS } = require('../../shared/contants');
const ErrorWrapper = require('../../shared/error-wrapper');

class JobsService {

  static async getUserUnpaidJobs(profileId) {
    return await Job.findAll({
      where: {
        [Op.or]: [
          { paid: false },
          { paid: null }
        ]
      },
      include: [
        {
          model: Contract,
          required: true,
          where: {
            [Op.or]: [
              {
                ClientId: profileId,
              },
              {
                ContractorId: profileId,
              },
            ],
            status: CONTRACT_STATUS.IN_PROGRESS,
          },
        },
      ],
    });
  }

  static async payJob(jobId, clientId) {
    const job = await Job.findOne(
      {
        where: {
          id: jobId,
        },
        include: [
          {
            model: Contract,
            required: true,
            attributes: ['ContractorId'],
            where: {
              ClientId: clientId,
            },
          },
        ],
      }
    );

    if (!job) throw new ErrorWrapper(`Job with id: ${jobId}, not found`, HTTP_CODE_ERRORS.NOT_FOUND);
    if (job.paid) throw new ErrorWrapper('Job is already paid', HTTP_CODE_ERRORS.CONFLICT);

    const [client, contractor] = await Promise.all([
      Profile.findByPk(clientId),
      Profile.findByPk(job.Contract.ContractorId),
    ]);

    if (client.balance < job.price) throw new ErrorWrapper('Insufficient funds', HTTP_CODE_ERRORS.BAD_REQUEST);

    client.balance = client.balance - job.price;
    contractor.balance = contractor.balance + job.price;
    job.paid = true;
    job.paymentDate = new Date().toISOString();

    try {
      return await sequelize.transaction(async transaction => {
        await Promise.all([
          client.save({ transaction: transaction }),
          contractor.save({ transaction: transaction }),
          job.save({ transaction: transaction }),
        ]);

        return job;
      });
    } catch (error) {
      console.error(`[jobs.service.payJob] ${error.message}`);
      throw error;
    }
  }
}

module.exports = JobsService;