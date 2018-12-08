import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { GtfsService } from '../services/gtfs.service';
import { Endpoints } from '../../commom/configs/endpoints.config';
import { gtfsDto } from '../../ceturb/models/dto/gtfs.dto';
import { ErrorMessage } from '../../commom/DTOs/errorMessages/errorMessage';
const raiz: string = new Endpoints().rotaRaiz;
const path: string = `${raiz}/gtfs`;

@Controller( `${raiz}/gtfs` )
@ApiUseTags( 'GTFS' )
export class GtfsController {

    constructor( public service: GtfsService ) { }

    @Get()
    @ApiOperation( {
        title: "GTFS",
        description: 'lista TODOS os arquivos GTFS existentes no minio'
    } )
    @ApiResponse( {
        status: 200,
        description: 'Gtfs Encontrado',
        type: gtfsDto,
        isArray: true
    } )
    @ApiResponse( {
        status: 404,
        description: 'Gtfs Não Encontrado',
        type: ErrorMessage
    } )
    public async getAll ( @Res() res ) {
        try {
            let response = await this.service.getAll();
            if ( response.length > 0 ) {
                res
                    .status( HttpStatus.OK )
                    .send( response );
            }
            else {
                let msg: string = "Não há arquivos registrados";
                let rota: string = path;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta );
            }

        } catch ( err ) {
            let msg: string = 'Ocorreu um erro interno no servidor.';
            let rota: string = path;
            let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.INTERNAL_SERVER_ERROR )
                .send( resposta );
        }
    }












    @Get( '/:ano' )
    @ApiOperation( {
        title: 'GTFS por ano',
        description: 'lista os arquivos GTFS existentes no minio de um ano específicos'
    } )
    @ApiResponse( {
        status: 200,
        description: 'Gtfs Encontrado',
        type: gtfsDto,
        isArray: true
    } )
    @ApiResponse( {
        status: 404,
        description: 'Gtfs Não Encontrado',
        type: ErrorMessage
    } )
    @ApiImplicitParam( {
        name: 'ano',
        description: 'Ano do GTFS',
        required: true,
        type: 'number'
    } )
    public async getByYear ( @Param( 'ano' ) ano, @Res() res ) {
        try {
            let response = await this.service.getByYear( ano );
            if ( response.length > 0 ) {
                res
                    .status( HttpStatus.OK )
                    .send( response );
            }
            else {
                let msg: string = "Não há arquivos registrados nesse ano";
                let rota: string = path;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta );
            }

        } catch ( err ) {
            let msg: string = 'Ocorreu um erro interno no servidor.';
            let rota: string = path;
            let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.INTERNAL_SERVER_ERROR )
                .send( resposta );
        }
    }










    @Get( '/:year/:month' )
    @ApiOperation( {
        title: 'GTFS por ano e mês',
        description: 'lista os arquivos GTFS existentes no minio de um ano e mês específicos'
    } )
    @ApiResponse( {
        status: 200,
        description: 'Gtfs Encontrado',
        type: gtfsDto,
        isArray: true
    } )
    @ApiResponse( {
        status: 404,
        description: 'Gtfs Não Encontrado',
        type: ErrorMessage
    } )
    @ApiImplicitParam( {
        name: 'year',
        description: 'Ano do GTFS',
        required: true,
        type: 'number'
    } )
    @ApiImplicitParam( {
        name: 'month',
        description: 'Mês do GTFS',
        required: true,
        type: 'number'
    } )
    public async getByYearMonth ( @Param( 'year' ) year, @Param( 'month' ) month, @Res() res ) {
        try {
            let response = await this.service.getByYearMonth( year, month );
            if ( response.length > 0 ) {
                res
                    .status( HttpStatus.OK )
                    .send( response );
            }
            else {
                let msg: string = "Não há arquivos registrados nesse ano e mês";
                let rota: string = path;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta );
            }

        } catch ( err ) {
            let msg: string = 'Ocorreu um erro interno no servidor.';
            let rota: string = path;
            let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.INTERNAL_SERVER_ERROR )
                .send( resposta );
        }
    }












    @Get( '/:year/:month/:day' )
    @ApiOperation( {
        title: 'GTFS por data',
        description: 'lista os arquivos GTFS existentes no minio de um ano, mês e dia específicos'
    } )
    @ApiResponse( {
        status: 200,
        description: 'Gtfs Encontrado',
        type: gtfsDto,
        isArray: true
    } )
    @ApiResponse( {
        status: 404,
        description: 'Gtfs Não Encontrado',
        type: ErrorMessage
    } )
    @ApiImplicitParam( {
        name: 'year',
        description: 'Ano do GTFS',
        required: true,
        type: 'number'
    } )
    @ApiImplicitParam( {
        name: 'month',
        description: 'Mês do GTFS',
        required: true,
        type: 'number'
    } )
    @ApiImplicitParam( {
        name: 'day',
        description: 'Dia do GTFS',
        required: true,
        type: 'number'
    } )
    public async getByYearMonthDay ( @Param( 'year' ) year, @Param( 'month' ) month, @Param( 'day' ) day, @Res() res ) {
        try {
            let response = await this.service.getByYearMonthDay( year, month, day );
            if ( response.length > 0 ) {
                res
                    .status( HttpStatus.OK )
                    .send( response );
            }
            else {
                let msg: string = "Não há arquivos registrados nesse ano, mês e dia";
                let rota: string = path;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta );
            }
        } catch ( err ) {
            let msg: string = 'Ocorreu um erro interno no servidor.';
            let rota: string = path;
            let status: number = HttpStatus.INTERNAL_SERVER_ERROR;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.INTERNAL_SERVER_ERROR )
                .send( resposta );
        }
    }
}
