const apicache = require( 'apicache' ).options( { debug: false } ).middleware;
const request = require( 'request-promise' );
const appConfig = require( '../config/app' );
const buscaBusConfig = require( '../config/buscabus' );

module.exports = app => {

    app.use( '/buscabus/*', apicache( '30 seconds'), ( req, res, next ) => {
        const apiPath = req.originalUrl.replace( `${appConfig.path}/buscabus/`, '' );
        const auth = "Basic " + new Buffer( buscaBusConfig.user + ":" + buscaBusConfig.password ).toString( 'base64' );

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
        .then( data => {
            res.json( data );
        })
        .catch( err => {
            next( err );
        })
    } );

};
