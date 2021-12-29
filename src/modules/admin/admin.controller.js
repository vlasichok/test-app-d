const { getBestClients, getBestProfession } = require('./admin.service');
const { HTTP_CODE_ERRORS } = require('../../shared/contants');

class AdminController {

  static async handleBestProfessionReq(req, res) {
    try {
      const { start, end } = req.query;
      const result = await getBestProfession(start, end);

      res.json(result);
    } catch (error) {
      const code = error.code || HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR;
      res.status(code).send(error.message);
    }
  }

  static async handleBestClientsReq(req, res) {
    try {
      const { start, end, limit } = req.query;
      const result = await getBestClients(start, end, limit);

      res.json(result);
    } catch (error) {
      const code = error.code || HTTP_CODE_ERRORS.INTERNAL_SERVER_ERROR;
      res.status(code).send(error.message);
    }
  }

}

module.exports = AdminController;