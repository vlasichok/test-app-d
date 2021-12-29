const { depositToBalance } = require('./balances.service');
const { HTTP_CODE_ERRORS } = require('../../shared/contants');

class BalancesService {

  static async depositToBalanceReq(req, res) {
    try {
      const clientId = req.params.userId;
      const { depositAmount } = req.body;

      const profile = await depositToBalance(clientId, depositAmount);

      res.json(profile);
    } catch (error) {
      const code = error.code || HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR;
      res.status(code).send(error.message);
    }
  }
}

module.exports = BalancesService;