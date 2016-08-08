const apicache = require( 'apicache' ).options( { debug: false } ).middleware;

module.exports = app => {

    const scheduleController = require( '../controllers/scheduleController' )();

    app.get( '/schedule/:line', apicache( '24 hours' ), scheduleController.getList );

    return app;
};
