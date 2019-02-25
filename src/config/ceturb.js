const ceturbApi =
  process.env.CETURB_API || 'http://api.ceturb.des.es.gov.br/onibus/api';

module.exports = {
  api: ceturbApi,
  linesEndpoint: `${ceturbApi}/ConsultaLinha`,
  routesEndpoint: `${ceturbApi}/BuscaItinerarios`,
  schedulesEndpoint: `${ceturbApi}/BuscaHorarios`,
  notesEndpoint: `${ceturbApi}/BuscaHorarioObse`
};
