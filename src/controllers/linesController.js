const ceturbService = require('../services/ceturbService');
const Promise = require('bluebird');
const _ = require('lodash');

module.exports = () => {
  var linesController = new Object();

  linesController.getList = (req, res, next) => {
    return Promise.all([
      ceturbService().getLines('T'),
      ceturbService().getLines('S')
    ])
      .then(l => {
        const lines = _.flatten(l).map(a => {
          return {
            number: a.Linha,
            name: a.Descricao.trim().toUpperCase()
          };
        });

        lines.sort((a, b) => {
          return a.number.localeCompare(b.number);
        });

        return res.json(lines);
      })
      .catch(err => {
        next(err);
      });
  };

  return linesController;
};
