const config = require( './config/app' );
const buscaBusConfig = require( './config/buscabus' );

if ( config.env === 'production' ) {
    require( 'newrelic' );
}

const express = require( 'express' );
const bodyParser = require( 'body-parser' );
const apiMiddleware = require( 'node-mw-api-prodest' ).middleware;

let app = express();

app.use( bodyParser.json() );

app.use( apiMiddleware( {
    compress: true,
    cors: true
} ) );

require( './routes/buscabus' )( app );

// Todos os erros do transcol online devem retornar uma mensagem padrão para o usuário
app.use( ( err, req, res, next ) => {
    err.handled = true;
    err.userMessage = buscaBusConfig.errorMsg;
    next( err );
} );

// load our routes
require( './routes/lines' )( app );
require( './routes/schedule' )( app );
require( './routes/route' )( app );

app.use( apiMiddleware( {
    error: {
        notFound: true,
        debug: config.env === 'development'
    }
} ) );

let pathApp = express();

const path = config.path;
pathApp.use( path, app );

module.exports = pathApp;
