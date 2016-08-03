const apicache = require( 'apicache' ).options( { debug: false } ).middleware;

module.exports = app => {

    const routeController = require( '../controllers/routeController' )();

    app.get( '/route/:line', apicache( '10 minutes' ), routeController.getList );

    return app;
};
