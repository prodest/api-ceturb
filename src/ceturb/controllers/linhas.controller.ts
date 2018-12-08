import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { LinhasService } from '../services/linhas.service';
import { Endpoints } from '../../commom/configs/endpoints.config';
import { LinhaDto } from '../../ceturb/models/dto/linha.dto';
import { ErrorMessage } from '../../commom/DTOs/errorMessages/errorMessage';
import { itinerarioDto } from '../../ceturb/models/dto/itinerario.dto';
import { HorarioDto } from '../../ceturb/models/dto/horarios.dto';
import { HorarioObsDto } from '../../ceturb/models/dto/horarioObs.dto';
const raiz: string = new Endpoints().rotaRaiz;
const path: string = `${raiz}/linha`;

@Controller( `${raiz}/linha` )
@ApiUseTags( 'Linhas' )
export class LinhasController {
    constructor( public service: LinhasService ) { }





    @Get()
    @ApiOperation(
        {
            title: 'Linhas',
            description: 'listar as linhas de ônibus ativas. \nOrigem: Geocontrol'
        }
    )
    @ApiResponse(
        {
            status: 200,
            description: 'Linhas encontradas',
            type: LinhaDto,
            isArray: true
        } )
    public async listar ( @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.retornar_linhas() );
        } catch ( err ) {
            let msg: string = err.message;
            let rota: string = path;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta )
        }
    }

















    @Get( '/:numero/itinerarios' )
    @ApiOperation( {
        title: 'Itinerarios por linha',
        description: 'lista os itinerários existentes de uma linha. \nOrigem: Geocontrol'
    } )
    @ApiResponse( {
        status: 200,
        description: 'itinerário encontrado',
        type: itinerarioDto,
        isArray: true
    } )
    @ApiResponse( {
        status: 404,
        description: 'Itinerario não encontrado',
        type: ErrorMessage
    } )
    @ApiImplicitParam( {
        name: 'numero',
        description: 'Numero de bandeira da Linha',
        required: true,
        type: 'number'
    } )
    public async buscar ( @Param( 'numero' ) numero, @Res() res ) {
        try {
            let response = await this.service.busca_itinerario( numero );
            let itinerarios = JSON.parse( JSON.stringify( response ) );
            if ( itinerarios.length > 0 )
                res
                    .status( HttpStatus.OK )
                    .send( response );
            else {
                let msg: string = "Não há registros de itinerarios para essa linha";
                let rota: string = `${path}/${numero}/itinerarios`;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta )
            }

        } catch ( err ) {
            let msg: string = err.message;
            let rota: string = `${path}/${numero}/itinerarios`;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta )
        }
    }





















    @Get( '/:numero/horarios' )
    @ApiOperation( {
        title: 'Horarios por Linha',
        description: 'lista os horarios de uma linha. \nOrigem: Geocontrol'
    } )
    @ApiResponse( {
        status: 200,
        description: 'Horarios encontrados',
        type: HorarioDto,
        isArray: true
    } )
    @ApiResponse( {
        status: 404,
        description: 'Horários não encontrados',
        type: ErrorMessage
    } )
    @ApiImplicitParam( {
        name: 'numero',
        description: 'Numero de bandeira da Linha',
        required: true,
        type: 'number'
    } )

    public async listarHorarios ( @Param( 'numero' ) numero, @Res() res ) {
        try {
            let horarios = await this.service.lista_horario( numero );
            if ( horarios.length > 0 ) {
                res
                    .status( HttpStatus.OK )
                    .send( horarios );
            } else {
                let msg: string = "Horarios não encontrados";
                let rota: string = `${path}/${numero}/horarios`;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta );
            }
        } catch ( err ) {
            let msg: string = err.message;
            let rota: string = `${path}/${numero}/horarios`;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta );
        }
    }






















    @Get( '/:numero/horarios/obs' )
    @ApiOperation( {
        title: 'Observações sobre as linhas',
        description: 'lista as possíveis observações sobre os horarios de uma linha. \nOrigem: Geocontrol'
    } )
    @ApiResponse( {
        status: 200,
        description: 'Observações encontradas',
        type: HorarioObsDto,
        isArray: true
    } )
    @ApiResponse( {
        status: 404,
        description: 'Não há observações',
        type: ErrorMessage
    } )
    @ApiImplicitParam( {
        name: 'numero',
        description: 'Numero de bandeira da Linha',
        required: true,
        type: 'number'
    } )

    public async listarObs ( @Param( 'numero' ) numero, @Res() res ) {
        try {
            let dados = await this.service.lista_horarioObs( numero );
            if ( dados.length > 0 ) {
                res
                    .status( HttpStatus.OK )
                    .send( dados );
            } else {
                let msg: string = "Observações não encontradas";
                let rota: string = `${path}/${numero}/horarios/obs`;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta );
            }
        } catch ( err ) {
            let msg: string = err.message;
            let rota: string = `${path}/${numero}/horarios/obs`;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta );
        }
    }
}
