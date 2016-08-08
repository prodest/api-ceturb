const ceturbService = require( '../services/ceturbService' );
const _ = require( 'lodash' );

module.exports = () => {
    var routesController = new Object();

    function groupByDirection( list ) {
        const grouped = _
            .chain( list )
            .groupBy( 'direction' )
            .map( ( list, key ) => {
                return {
                    type: key,
                    paths: list.map( a => a.description )
                };
            } )
            .value();

        return grouped.sort( ( a, b ) => a.type.localeCompare( b.type ) );
    }

    function groupByLine( list ) {
        return _
            .chain( list )
            .groupBy( 'number' )
            .map( ( list, key ) => {
                return {
                    line: {
                        number: key,
                        name: list[ 0 ].name
                    },
                    directions: groupByDirection( list )
                };
            } )
            .value();
    }

    routesController.getList = ( req, res ) => {
        const line = req.params.line;

        return ceturbService().getRoutes( line )
        .then( data => {
            data.sort( ( a, b ) => {
                return a.Sequencia - b.Sequencia;
            } );

            data = data.map( a => {
                return {
                    number: a.Linha,
                    name: a.Descricao_Linha,
                    direction: a.Sentido == 'I' ? 'Ida' : 'Volta',
                    description: a.Desc_Via
                };
            } );

            let grouped = groupByLine( data );

            return res.json( grouped[ 0 ] );
        } )
        .catch( err => {
            throw err;
        } );
    };

    return routesController;
};
