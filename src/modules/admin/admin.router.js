const { Router } = require('express');

const AdminController = require('./admin.controller');

const router = Router();

module.exports = (app) => {
  app.use('/admin', router);

  router.get('/best-clients', AdminController.handleBestClientsReq);
  router.get('/best-profession', AdminController.handleBestProfessionReq);
};