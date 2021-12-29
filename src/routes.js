const { Router } = require('express');
const swaggerUi = require('swagger-ui-express');
const swaggerDocument = require('./swagger.json');
const adminRouter = require('./modules/admin/admin.router');
const balancesRouter = require('./modules/balances/balances.router');
const contractsRouter = require('./modules/contracts/contracts.router');
const jobsRouter = require('./modules/jobs/jobs.router');

module.exports = () => {
    const router = Router();
    router.use('/docs', swaggerUi.serve);
    router.get('/docs', swaggerUi.setup(swaggerDocument));

    adminRouter(router); // admin/ routes
    balancesRouter(router); // balances/ routes
    contractsRouter(router); // contracts/ routes
    jobsRouter(router); // jobs/ routes

    return router;
};