const config = require( './config/app' );
const cors = require( 'cors' );

if ( config.env === 'production' ) {
    require( 'newrelic' );
}

const express = require( 'express' );
const compress = require( 'compression' );

let app = express();

// Cors is full enabled
app.use( cors() );

// Compress responses
app.use( compress() );

// load our routes
app = require( './routes/lines' )( app );
app = require( './routes/schedule' )( app );
app = require( './routes/route' )( app );

// error handlers

// catch 404 and forward to error handler
app.use( ( req, res, next ) => {
    var err = new Error( 'Not Found' );
    err.status = 404;
    next( err );
} );

// development error handler
// will print full error
if ( config.env === 'development' ) {
    app.use( ( err, req, res, next ) => {
        res.status( err.status || 500 );
        console.log( err );
        res.json(
            {
                err: err.message,
                stack: err.stack
            } );
    } );
}

// production error handler
// only error message leaked to user
app.use( ( err, req, res, next ) => {
    res.status( err.status || 500 );
    console.log( err.stack );
    res.json( {
        err: err.message,
        fields: []
    } );
} );

let pathApp = express();

const path = config.path;
pathApp.use( path, app );

module.exports = pathApp;
