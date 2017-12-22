const apicache = require( 'apicache' ).options( 
    {
        debug: false,
        appendKey: [ 'bodyRaw' ],
        statusCodes: {
            include: [ 200 ]
        }
    } ).middleware;
const buscaBusController = require( '../controllers/buscaBusController' )();

module.exports = app => {

    app.use( ( req, res, next ) => {
        if ( req.body ) {
            req.bodyRaw = JSON.stringify( req.body );
        }
        next();
    } );

    app.use( '/transcolOnline/svc/json/db/pesquisarPontosDeParada', apicache( '3 hours' ), buscaBusController.proxyBuscabus );
    app.use( '/transcolOnline/svc/json/db/listarItinerarios', apicache( '3 hours' ), buscaBusController.proxyBuscabus );

    app.use( '/transcolOnline/svc/json/db/listarPontosDeParada', apicache( '3 hours' ), buscaBusController.obterPontosParada );

    app.use( '/transcolOnline/svc/estimativas/obterEstimativasPorOrigemELinha', apicache( '10 seconds' ), buscaBusController.obterPrevisao );
    app.use( '/transcolOnline/svc/estimativas/obterEstimativasPorOrigemEDestino', apicache( '10 seconds' ), buscaBusController.obterPrevisao );

    app.use( '/transcolOnline/svc/estimativas/obterEstimativasPorOrigem', apicache( '10 seconds' ), buscaBusController.obterPrevisaoAgrupada );

    app.use( '/transcolOnline/*', apicache( '10 seconds' ), buscaBusController.proxyBuscabus );

};
