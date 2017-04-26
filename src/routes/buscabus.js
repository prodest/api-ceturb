const apicache = require( 'apicache' ).options( { debug: false, appendKey: [ 'bodyRaw' ] } ).middleware;
const request = require( 'request-promise' );
const appConfig = require( '../config/app' );
const buscaBusConfig = require( '../config/buscabus' );

module.exports = app => {

    app.use( ( req, res, next ) => {
        if ( req.body ) {
            req.bodyRaw = JSON.stringify( req.body );
        }
        next();
    } );

    app.use( '/buscabus/svc/json/db/pesquisarPontosDeParada', apicache( '6 hours' ), proxyBuscabus );
    app.use( '/buscabus/svc/json/db/listarPontosDeParada', apicache( '6 hours' ), proxyBuscabus );
    app.use( '/buscabus/svc/json/db/pesquisarPontosDeParada', apicache( '6 hours' ), proxyBuscabus );
    app.use( '/buscabus/svc/json/db/listarItinerarios', apicache( '6 hours' ), proxyBuscabus );

    app.use( '/buscabus/*', apicache( '30 seconds' ), proxyBuscabus );

    function proxyBuscabus( req, res, next ) {
        const apiPath = req.originalUrl.replace( `${appConfig.path}/buscabus/`, '' );
        const auth = 'Basic ' + new Buffer( buscaBusConfig.user + ':' + buscaBusConfig.password ).toString( 'base64' );

        const options = {
            method: 'POST',
            uri: `${buscaBusConfig.api}/${apiPath}`,
            headers: {
                'User-Agent': 'PRODEST-api-gateway',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: req.body,
            json: true
        };

        request( options )
            .then( data => res.json( data ) )
            .catch( err => next( err ) );
    }

};
