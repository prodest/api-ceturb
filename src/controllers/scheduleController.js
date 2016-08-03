const ceturbService = require( '../services/ceturbService' );
const _ = require( 'lodash' );

module.exports = () => {
    var schedulesController = new Object();

    function groupByDayGroup( list ) {
        return _
            .chain( list )
            .groupBy( 'dayGroup' )
            .map( ( list ) => {
                return {
                    name: list[ 0 ].dayGroupName,
                    beginDate: list[ 0 ].beginDate,
                    schedule: list.map( a => ( a.time + a.direction ).trim() )
                };
            } )
            .value();
    }

    function groupByTerminal( list ) {
        return _
            .chain( list )
            .groupBy( 'terminalSequence' )
            .map( ( list ) => {
                return {
                    terminal: list[ 0 ].terminal,
                    dayGroups: groupByDayGroup( list )
                };
            } )
            .value();
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
                    departures: groupByTerminal( list )
                };
            } )
            .value();
    }

    schedulesController.getList = ( req, res ) => {
        const line = req.params.line;

        return ceturbService().getSchedules( line )
        .then( data => {
            data.sort( ( a, b ) => {
                return a.Terminal_Seq - b.Terminal_Seq;
            } );

            data = data.map( a => {
                return {
                    number: a.Linha,
                    name: a.Descricao_Linha,
                    terminal: a.Desc_Terminal,
                    terminalSequence: a.Terminal_Seq,
                    dayGroup: a.TP_Horario,
                    dayGroupName: a.Descricao_Hora,
                    beginDate: a.Dt_Inicio,
                    time: a.Hora_Saida,
                    direction: a.Tipo_Orientacao
                };
            } );

            let grouped = groupByLine( data );

            return res.json( grouped );
        } );
    };

    return schedulesController;
};
