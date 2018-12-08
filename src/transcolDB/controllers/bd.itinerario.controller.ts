import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { ItinerarioService } from '../services/itinerario.service';
import { Itinerario } from '../models/Itinerario.model';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { Viagem } from '../models/Viagem.model';
import { Endpoints } from '../../commom/configs/endpoints.config';
import { PontoGeografico } from '../../transcolDB/models/PontoGeografico.model';
import { ErrorMessage } from '../../commom/DTOs/errorMessages/errorMessage';
const raiz: string = new Endpoints().rotaRaiz;
const path = `${raiz}/itinerarios`;

@Controller( `${raiz}/itinerarios` )
@ApiUseTags( 'Itinerarios' )
export class BDItinerarioController {
    constructor( private readonly Service: ItinerarioService ) { }

    /*
        @Get()
        @ApiOperation( {
            description: "Listar itinerarios registrados no banco auxiliar",
            title: "Itinerarios em @TranscolDB"
        } )
        @ApiResponse( { status: 302, description: "Itinerarios encontrados" } )
        @ApiResponse( { status: 404, description: "Itinerarios não encontrados" } )
        @ApiResponse( { status: 502, description: "Erro na busca" } )
    
        async getItinerarios ( @Res() res ) {
            try {
                let itinerarios: Itinerario[] = await this.Service.getItinerarios();
                if ( itinerarios.length > 0 ) {
                    res
                        .status( HttpStatus.FOUND )
                        .send( itinerarios );
                } else {
                    res
                        .status( HttpStatus.NOT_FOUND )
                        .send( "Nenhum itinerario encontrado na busca" )
                }
            } catch ( err ) {
                res
                    .status( HttpStatus.BAD_GATEWAY )
                    .send( err.message );
            }
        }
    */

    @Get( '/:codigo_linha' )
    @ApiOperation( {
        description: "Listar os itinerarios de uma linha especifica. \nOrigem: banco de dados",
        title: "Itinerarios por Linha"
    } )
    @ApiResponse( {
        status: 302,
        description: "Itinerarios encontrados",
        type: Itinerario,
        isArray: true
    } )
    @ApiResponse( {
        status: 404,
        description: "Itinerarios não encontrados",
        type: ErrorMessage
    } )
    @ApiImplicitParam( {
        name: 'codigo_linha',
        description: 'codigo da linha. Ex. 509',
        required: true,
        type: 'number'
    } )
    async getItinerariosByCodigo ( @Res() res, @Param( 'codigo_linha' ) codigo_linha ) {
        try {
            let itinerarios: Itinerario[] = await this.Service.getItinerariosByCodigo( codigo_linha );
            if ( itinerarios.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( itinerarios );
            } else {
                let msg: string = "Nenhum itinerario encontrado na busca";
                let rota: string = `${path}/${codigo_linha}`;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta )
            }
        } catch ( err ) {
            let msg: string = err.message;
            let rota: string = `${path}/${codigo_linha}`;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta );
        }
    }


    @Get( '/:codigo_itinerario/viagens' )
    @ApiOperation( {
        description: "Listar as viagens de um itinerário especifico. \nOrigem: banco de dados",
        title: "Viagens por Itinerario"
    } )
    @ApiResponse(
        {
            status: 302,
            description: "Viagems encontradas",
            type: Viagem,
            isArray: true
        } )
    @ApiResponse( {
        status: 404,
        description: "Viagems não encontrados",
        type: ErrorMessage
    } )
    @ApiImplicitParam( {
        name: 'codigo_itinerario',
        description: 'codigo do itinerario',
        required: true,
        type: 'number'
    } )
    async getViagemsByCodigo ( @Res() res, @Param( 'codigo_itinerario' ) codigo_itinerario ) {
        try {
            let viagems: Viagem[] = await this.Service.getViagemByItinerarioCode( codigo_itinerario );
            if ( viagems.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( viagems );
            } else {
                let msg: string = "Nenhuma viagem encontrada na busca";
                let rota: string = `${path}/${codigo_itinerario}/viagens`;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta )
            }
        } catch ( err ) {
            let msg: string = "Nenhuma viagem encontrada na busca";
            let rota: string = `${path}/${codigo_itinerario}/viagens`;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta );
        }
    }


    @Get( '/:codigo_itinerario/shapes' )
    @ApiOperation( {
        description: "Listar os pontos geográficos percorridos por um itinerario (SHAPES). \nOrigem: banco de dados",
        title: "Pontos geográficos por Itinerario"
    } )
    @ApiResponse( {
        status: 302,
        description: "coordenadas encontradas",
        type: PontoGeografico,
        isArray: true
    } )
    @ApiResponse( {
        status: 404,
        description: "coordenadas não encontrados",
        type: ErrorMessage
    } )
    @ApiImplicitParam( {
        name: 'codigo_itinerario',
        description: 'codigo do itinerario (não é o id, é o código)',
        required: true,
        type: 'number'
    } )
    async getShapes ( @Res() res, @Param( 'codigo_itinerario' ) codigo_itinerario ) {
        try {
            let shapes: PontoGeografico[] = await this.Service.getShapesPorItinerario( codigo_itinerario );
            if ( shapes.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( shapes );
            } else {
                let msg: string = "Nenhuma coordenada encontrada na busca";
                let rota: string = `${path}/${codigo_itinerario}/shapes`;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta );
            }
        } catch ( err ) {
            let msg: string = err.message;
            let rota: string = `${path}/${codigo_itinerario}/shapes`;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res

                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta );
        }
    }
}
