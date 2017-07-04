const apicache = require( 'apicache' );
const redis = require( 'redis' );
const auth = require( 'basic-auth' );
const buscaBusController = require( '../controllers/buscaBusController' )();
const appConfig = require( '../config/app' );

const client = redis.createClient( { url: appConfig.redisURL } );
const cache = apicache.options( { redisClient: client, debug: false, appendKey: [ 'bodyRaw' ] } ).middleware;

// Simple route middleware to ensure user is authenticated.
//   Use this route middleware on any resource that needs to be protected.  If
//   the request is authenticated (typically via a persistent login session),
//   the request will proceed.  Otherwise, the user will be redirected to the
//   login page.
const ensureAuthenticated = function( req, res, next ) {
    let credentials = auth( req );

    if ( !credentials || appConfig.cacheUsername !== credentials.name || appConfig.cachePassword !== credentials.pass ) {
        res.statusCode = 401;
        res.setHeader( 'WWW-Authenticate', 'Basic realm="cache-transcol-online"' );
        res.end( 'Access denied' );
    } else {
        return next();
    }
};

module.exports = app => {

    app.use( '/transcolOnline/*', ( req, res, next ) => {
        req.apicacheGroup = 'transcolOnline';

        if ( req.body ) {
            req.bodyRaw = JSON.stringify( req.body );
        }
        next();
    } );

    app.get( '/transcolOnline/clearCache', ensureAuthenticated, ( req, res ) => {
        return res.json( apicache.clear( 'transcolOnline' ) );
    } );
    
    app.get( '/transcolOnline/cache', ensureAuthenticated, ( req, res ) => {
        return res.json( apicache.getIndex() );
    } );

    app.use( '/transcolOnline/svc/json/db/pesquisarPontosDeParada', cache( '3 hours' ), buscaBusController.proxyBuscabus );
    app.use( '/transcolOnline/svc/json/db/listarItinerarios', cache( '3 hours' ), buscaBusController.proxyBuscabus );

    app.use( '/transcolOnline/svc/json/db/listarPontosDeParada', cache( '3 hours' ), buscaBusController.obterPontosParada );

    app.use( '/transcolOnline/svc/estimativas/obterEstimativasPorOrigemELinha', cache( '10 seconds' ), buscaBusController.obterPrevisao );
    app.use( '/transcolOnline/svc/estimativas/obterEstimativasPorOrigemEDestino', cache( '10 seconds' ), buscaBusController.obterPrevisao );

    app.use( '/transcolOnline/svc/estimativas/obterEstimativasPorOrigem', cache( '10 seconds' ), buscaBusController.obterPrevisaoAgrupada );

    app.use( '/transcolOnline/*', cache( '10 seconds' ), buscaBusController.proxyBuscabus );

};
