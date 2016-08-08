const request = require( 'request-promise' );
const ceturb = require( '../config/ceturb' );

module.exports = () => {
    var ceturbService = new Object();

    ceturbService.getLines = function( lineType ) {
        const options = {
            uri: ceturb.linesEndpoint,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            qs: {
                Tipo_Linha: lineType
            },
            json: true
        };

        return request( options );
    };

    ceturbService.getRoutes = function( line ) {
        const options = {
            uri: `${ceturb.routesEndpoint}/${line}`,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };

        return request( options );
    };

    ceturbService.getSchedules = function( line ) {
        const options = {
            uri: `${ceturb.schedulesEndpoint}/${line}`,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };

        return request( options );
    };

    ceturbService.getNotes = function( line ) {
        const options = {
            uri: `${ceturb.notesEndpoint}/${line}`,
            headers: {
                'User-Agent': 'Request-Promise'
            },
            json: true
        };

        return request( options );
    };

    return ceturbService;
};
