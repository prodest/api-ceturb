const _ = require( 'lodash' );
const buscaBusConfig = require( '../config/buscabus' );
const appConfig = require( '../config/app' );
const moment = require( 'moment-timezone' );
const request = require( 'request-promise' );

moment.tz.setDefault( appConfig.TZ );

module.exports = () => {
    const buscaBusController = new Object();

    const requestBuscabus = ( req ) => {
        const apiPath = req.originalUrl.replace( `${appConfig.path}/transcolOnline/`, '' );
        const auth = 'Basic ' + new Buffer( buscaBusConfig.user + ':' + buscaBusConfig.password ).toString( 'base64' );

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

        return request( options );
    };

    const listItinerariesByIds = ( ids ) => {
        const auth = 'Basic ' + new Buffer( buscaBusConfig.user + ':' + buscaBusConfig.password ).toString( 'base64' );
        const uri = `http://localhost:${appConfig.port}${appConfig.path}/transcolOnline/svc/json/db/listarItinerarios`;

        const options = {
            method: 'POST',
            uri: uri,
            headers: {
                'User-Agent': 'PRODEST-api-gateway',
                'Authorization': auth,
                'Content-Type': 'application/json'
            },
            body: { listaIds: ids },
            json: true
        };

        return request( options );
    };

    const getPrevisionHours = ( hour, serverHour ) => {
        const horario = hour.format( 'HH:mm' );
        const previsaoEmMinutos = hour.diff( serverHour, 'minutes' );
        const previsao = previsaoEmMinutos === 0 ? 'Agora' : previsaoEmMinutos < 60 ? `${previsaoEmMinutos} min` : `${hour.diff( serverHour, 'hours' )} h`;
        return {
            previsaoEmMinutos,
            previsao,
            horario
        };
    };

    const confiabilidade = ( horarioDaTransmissao, horarioDoServidor ) => {
        const minutosAmarelo = 16 * 60 * 1000;
        const minutosVerde = 5 * 60 * 1000;

        const distancia = horarioDaTransmissao ? horarioDoServidor - horarioDaTransmissao : -1;

        if ( distancia < 0 ) {
            return 'grey';
        }
        if ( distancia > minutosAmarelo ) {
            return 'darkred';
        }
        if ( distancia > minutosVerde ) {
            return 'orange';
        }
        return 'green';
    };

    const createFullPrevision = ( prevision, itinerary, horarioDoServidor, pontoDeOrigemId, pontoDeDestinoId ) => {
        const serverHour = moment( horarioDoServidor );

        const originHours = getPrevisionHours( moment( prevision.horarioNaOrigem ), serverHour );
        const destinationHours = getPrevisionHours( moment( prevision.horarioNoDestino ), serverHour );

        return Object.assign( prevision, {
            pontoDeOrigemId,
            pontoDeDestinoId,
            bandeira: _.toLower( itinerary.bandeira ),
            complemento: _.toLower( itinerary.complemento ? itinerary.complemento.trim() : itinerary.complemento ),
            descricaoLinha: _.toLower( itinerary.descricaoLinha ),
            observacaoLinha: _.toLower( itinerary.observacaoLinha ),
            identificadorLinha: itinerary.identificadorLinha,
            linhaId: itinerary.linhaId,
            horarioNaOrigem: originHours.horario,
            previsaoNaOrigem: originHours.previsao,
            previsaoNaOrigemEmMinutos: originHours.previsaoEmMinutos,
            horarioNoDestino: destinationHours.horario,
            previsaoNoDestino: destinationHours.previsao,
            previsaoNoDestinoEmMinutos: destinationHours.previsaoEmMinutos,
            confiabilidade: confiabilidade( prevision.horarioDaTransmissao, horarioDoServidor )
        } );
    };

    const formatBusStops = ( stops ) => {
        return stops.map( stop => {
            stop.isTerminal = /T[A-Z]{2,}/.test( stop.identificador );
            stop.isPonto = !stop.isTerminal;
            stop.tipo = stop.isTerminal ? 'terminal' : 'ponto';

            return Object.assign( stop, {
                bairro: ( stop.descricao || '' ).trim(),
                logradouro: ( stop.logradouro || '' ).trim(),
                municipio: ( stop.municipio || '' ).trim(),
                descricao: ( stop.descricao || '' ).trim()
            } );
        } );
    };

    const applicationFilters = ( horarioDoServidor, prevision, filterMinutes = true ) => {
        if ( filterMinutes ) {
            const serverHour = moment( horarioDoServidor );
            const originHours = moment( prevision.horarioNaOrigem );
            const minutes = originHours.diff( serverHour, 'minutes' );

            return !prevision.pontoFinal && minutes < 120;
        }

        return !prevision.pontoFinal;
    };

    buscaBusController.obterPontosParada = ( req, res, next ) => {
        return requestBuscabus( req )
            .then( data => data && data.pontosDeParada ? res.json( formatBusStops( data.pontosDeParada ) ) : res.json( [] ) )
            .catch( err => next( err ) );
    };

    buscaBusController.obterPrevisao = ( req, res, next ) => {
        return requestBuscabus( req )
            .then( ( { horarioDoServidor, estimativas, pontoDeOrigemId, pontoDeDestinoId } ) => {
                const previsions = _.chain( estimativas )
                    .filter( p => applicationFilters( horarioDoServidor, p ) )
                    .sortBy( 'horarioNaOrigem' )
                    .value();

                const itinerariesIds = previsions.map( e => e.itinerarioId );

                return listItinerariesByIds( itinerariesIds )
                    .then( ( { itinerarios } ) => {
                        const itinerariesMap = _.keyBy( itinerarios, 'id' );
                        return _.chain( previsions )
                            .map( e => createFullPrevision( e, itinerariesMap[ e.itinerarioId ], horarioDoServidor, pontoDeOrigemId, pontoDeDestinoId ) )
                            .sortBy( 'previsaoNaOrigemEmMinutos' )
                            .value();
                    } );
            } )
            .then( data => res.json( data ) )
            .catch( err => next( err ) );
    };

    buscaBusController.obterPrevisaoAgrupada = ( req, res, next ) => {
        return requestBuscabus( req )
            .then( ( { horarioDoServidor, estimativas, pontoDeOrigemId, pontoDeDestinoId } ) => {

                const previsions = _.chain( estimativas )
                    .filter( p => applicationFilters( horarioDoServidor, p, false ) )
                    .sortBy( 'horarioNaOrigem' )
                    .groupBy( 'itinerarioId' )
                    .valuesIn()
                    .map( values => values[ 0 ] )
                    .value();

                const itinerariesIds = previsions.map( e => e.itinerarioId );

                return listItinerariesByIds( itinerariesIds )
                    .then( ( { itinerarios } ) => {
                        const itinerariesMap = _.keyBy( itinerarios, 'id' );
                        return _.chain( previsions )
                            .map( e => createFullPrevision( e, itinerariesMap[ e.itinerarioId ], horarioDoServidor, pontoDeOrigemId, pontoDeDestinoId ) )
                            .sortBy( 'previsaoNaOrigemEmMinutos' )
                            .groupBy( 'identificadorLinha' )
                            .valuesIn()
                            .map( values => values[ 0 ] )
                            .sortBy( 'previsaoNaOrigemEmMinutos' )
                            .value();
                    } );
            } )
            .then( data => res.json( data ) )
            .catch( err => next( err ) );
    };

    buscaBusController.proxyBuscabus = ( req, res, next ) => {
        return requestBuscabus( req )
            .then( data => res.json( data ) )
            .catch( err => next( err ) );
    };

    return buscaBusController;
};
