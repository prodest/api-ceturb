const apicache = require( 'apicache' ).options( { debug: false } ).middleware;

module.exports = app => {

    const scheduleController = require( '../controllers/scheduleController' )();

    app.get( '/schedule/:line', apicache( '10 minutes' ), scheduleController.getList );

    return app;
};
