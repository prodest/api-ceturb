const apicache = require( 'apicache' ).options( { debug: false, appendKey: [ 'bodyRaw' ] } ).middleware;
const buscaBusController = require( '../controllers/buscaBusController' )();

module.exports = app => {

    app.use( ( req, res, next ) => {
        if ( req.body ) {
            req.bodyRaw = JSON.stringify( req.body );
        }
        next();
    } );

    app.use( '/transcolOnline/svc/json/db/pesquisarPontosDeParada', apicache( '6 hours' ), buscaBusController.proxyBuscabus );
    app.use( '/transcolOnline/svc/json/db/listarItinerarios', apicache( '6 hours' ), buscaBusController.proxyBuscabus );

    app.use( '/transcolOnline/svc/json/db/listarPontosDeParada', apicache( '6 hours' ), buscaBusController.obterPontosParada );

    app.use( '/transcolOnline/svc/estimativas/obterEstimativasPorOrigemELinha', apicache( '30 seconds' ), buscaBusController.obterPrevisao );
    app.use( '/transcolOnline/svc/estimativas/obterEstimativasPorOrigemEDestino', apicache( '30 seconds' ), buscaBusController.obterPrevisao );

    app.use( '/transcolOnline/svc/estimativas/obterEstimativasPorOrigem', apicache( '30 seconds' ), buscaBusController.obterPrevisaoAgrupada );

    app.use( '/transcolOnline/*', apicache( '30 seconds' ), buscaBusController.proxyBuscabus );

};
