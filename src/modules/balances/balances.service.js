const { Contract, Job, Profile, sequelize } = require('../../model');
const { CONTRACT_STATUS, PROFILE_TYPE, HTTP_CODE_ERRORS } = require('../../shared/contants');
const ErrorWrapper = require('../../shared/error-wrapper');
const { Op } = require('sequelize');

class BalancesService {

  static async depositToBalance(clientId, depositAmount) {
    const client = await Profile.findByPk(clientId);
    if (!client || client.type !== PROFILE_TYPE.CLIENT)
      throw new ErrorWrapper(`Client with ${clientId} not found`, HTTP_CODE_ERRORS.NOT_FOUND)

    const maxToDeposit = await Job.sum('price', {
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
          attributes: [],
          where: {
            status: CONTRACT_STATUS.IN_PROGRESS,
            ClientId: clientId,
          },
        },
      ],
    }).then(result => result * 0.25);
    if (depositAmount > maxToDeposit)
      throw new ErrorWrapper('You cannot deposit more than 25% his total of jobs to pay', HTTP_CODE_ERRORS.CONFLICT);

    client.balance = client.balance + depositAmount;
    return client.save();
  }
}

module.exports = BalancesService;