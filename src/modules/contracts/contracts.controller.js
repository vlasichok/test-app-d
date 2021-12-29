const { getContracts, getContractById } = require('./contracts.service');
const { HTTP_CODE_ERRORS } = require('../../shared/contants');

class ContractsService {

  static async handleGetContractByIdReq(req, res) {
    try {
      const { id } = req.params;
      const profileId = req.profile.id;

      const contract = await getContractById(id, profileId);

      res.json(contract);
    } catch (error) {
      const code = error.code || HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR;
      res.status(code).send(error.message);
    }
  }

  static async handleGetContractsReq(req, res) {
    try {
      const userId = req.profile.id;
      const contracts = await getContracts(userId);

      res.json(contracts);
    } catch (error) {
      const code = error.code || HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR;
      res.status(code).send(error.message);
    }
  }

}

module.exports = ContractsService;