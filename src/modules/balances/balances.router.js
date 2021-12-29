const { Router } = require('express');
const BalancesAdmin = require('./balances.controller');

const router = Router();

module.exports = (app) => {
  app.use('/balances', router);

  router.post('/deposit/:userId', BalancesAdmin.depositToBalanceReq);
};