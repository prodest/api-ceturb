const apicache = require( 'apicache' ).options( { debug: false } ).middleware;

module.exports = app => {

    const routeController = require( '../controllers/routeController' )();

    app.get( '/route/:line', apicache( '24 hours' ), routeController.getList );
};
