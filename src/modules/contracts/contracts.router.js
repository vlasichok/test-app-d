const { Router } = require('express');
const { getProfile } = require('../../middleware/getProfile');
const ContractsController = require('./contracts.controller');
const router = Router();

module.exports = (app) => {
  app.use('/contracts', router);

  router.get('/:id', getProfile, ContractsController.handleGetContractByIdReq);
  router.get('/', getProfile, ContractsController.handleGetContractsReq);
};