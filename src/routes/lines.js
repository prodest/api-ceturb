const apicache = require('apicache').options({ debug: false }).middleware;

module.exports = app => {
  const linesController = require('../controllers/linesController')();

  app.get('/lines', apicache('24 hours'), linesController.getList);
};
