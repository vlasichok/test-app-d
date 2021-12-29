const { Op } = require('sequelize');
const { Contract } = require('../../model');
const { CONTRACT_STATUS, HTTP_CODE_ERRORS } = require('../../shared/contants');
const ErrorWrapper = require('../../shared/error-wrapper');

class ContractsService {

  static async getContractById(id, profileId) {
    const contract = await Contract.findOne({
      where: { id,
        [Op.or]: [
          { ClientId: profileId },
          { ContractorId: profileId }
        ]
      },
    });

    if (!contract) throw new ErrorWrapper(`Contract with Id: ${id} not found`, HTTP_CODE_ERRORS.NOT_FOUND);

    return contract;
  }

  static async getContracts(profileId) {
    return Contract.findAll({
      where: {
        [Op.or]: [
          { ClientId: profileId },
          { ContractorId: profileId }
        ],
        status: {
          [Op.ne]: CONTRACT_STATUS.TERMINATED
        }
      }
    });
  }
}

module.exports = ContractsService;