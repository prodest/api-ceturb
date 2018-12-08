import { Controller, Get, Res, HttpStatus, Param } from '@nestjs/common';
import { AgenciaService } from '../services/agencia.service';
import { Agencia } from '../models/Agencia.model';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { Contato } from '../models/Contato.model';
import { Feriado } from '../models/Feriado.model';
import { Tarifa } from '../models/Tarifa.model';
import { Endpoints } from '../../commom/configs/endpoints.config';
import { FeriadoResponse } from '../../transcolDB/models/Dto/FeriadoResponse.dto';
import { ErrorMessage } from '../../commom/DTOs/errorMessages/errorMessage';
const raiz: string = new Endpoints().rotaRaiz;
const path = `${raiz}/agencias`;

@Controller( `${raiz}/agencias` )
@ApiUseTags( 'Agencias' )
export class BDAgenciaController {
    constructor( private readonly Service: AgenciaService ) { }

    @Get()
    @ApiOperation( {
        description: "Lista as agencias registradas. \nOrigem: banco de dados",
        title: "Agencias"
    } )
    @ApiResponse( {
        status: 302,
        description: "Agencias encontradas",
        type: Agencia,
        isArray: true
    } )
    @ApiResponse( {
        status: 404,
        description: "Agencias não encontradas",
        type: ErrorMessage
    } )

    async getAgencias ( @Res() res ) {
        try {
            let agencias: Agencia[] = await this.Service.getAgencias();
            if ( agencias.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( agencias );
            } else {
                let msg: string = "Nenhuma agencia encontrada na busca";
                let rota: string = path;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta )
            }
        } catch ( err ) {
            let msg: string = err.message;
            let rota: string = path;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta );
        }
    }

    @Get( '/contatos' )
    @ApiOperation( {
        description: "Lista os contatos que recebem logs do GTFS. \nOrigem: banco de dados",
        title: "Contatos"
    } )
    @ApiResponse( {
        status: 302,
        description: "Contatos encontrados",
        type: Contato,
        isArray: true
    } )
    @ApiResponse( {
        status: 404,
        description: "Contatos não encontrados",
        type: ErrorMessage
    } )

    async getContatos ( @Res() res ) {
        try {
            let contatos: Contato[] = await this.Service.getContatos();
            if ( contatos.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( contatos );
            } else {
                let msg: string = "Nenhum contato encontrado na busca";
                let rota: string = `${path}/contatos`;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta )
            }
        } catch ( err ) {
            let msg: string = err.message;
            let rota: string = `${path}/contatos`;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta );
        }
    }

    @Get( '/feriados' )
    @ApiOperation( {
        description: "Lista os feriados previstos. \nOrigem: banco de dados",
        title: "Feriados"
    } )
    @ApiResponse( {
        status: 302,
        description: "Feriados encontrados",
        type: Feriado,
        isArray: true
    } )

    @ApiResponse( {
        status: 404,
        description: "Feriados não encontrados",
        type: ErrorMessage
    } )

    async getFeriados ( @Res() res ) {
        try {
            let feriados: Feriado[] = await this.Service.getFeriados();
            if ( feriados.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( feriados );
            } else {
                let msg: string = "Nenhum feriado encontrado na busca";
                let rota: string = `${path}/feriados`;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta )
            }
        } catch ( err ) {
            let msg: string = err.message;
            let rota: string = `${path}/feriados`;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta );
        }
    }

    //DESATIVADO NA VERSÃO 1.11.9
    // @Get( '/feriados/validar/:ano/:mes/:dia' )
    // @ApiOperation( {
    //     description: "Indica se a data consultada é um feriado registrado no banco auxiliar ou não.",
    //     title: "Consulta booleana de Feriados da agencia por data"
    // } )
    // @ApiResponse( {
    //     status: 200,
    //     description: "Consulta executada com sucesso.",
    //     type: FeriadoResponse
    // } )
    // @ApiImplicitParam( {
    //     name: 'ano',
    //     description: 'porção da data referente ao ano. exemplo: 2018',
    //     required: true,
    //     type: 'number'
    // } )
    // @ApiImplicitParam( {
    //     name: 'mes',
    //     description: 'porção da data referente ao mês. exemplo: 12',
    //     required: true,
    //     type: 'number'
    // } )
    // @ApiImplicitParam( {
    //     name: 'dia',
    //     description: 'porção da data referente ao dia. exemplo: 25',
    //     required: true,
    //     type: 'number'
    // } )
    // async isFeriado ( @Res() res, @Param( 'ano' ) ano, @Param( 'mes' ) mes, @Param( 'dia' ) dia ) {
    //     let hoje = new Date( `${ano}/${mes}/${dia}` );
    //     let consulta;
    //     try {
    //         consulta = await this.Service.CheckFeriado( hoje.toLocaleDateString() );
    //         res
    //             .status( HttpStatus.OK )
    //             .send( consulta );
    //     }
    //     catch ( err ) {
    //         let msg: string = err.message;
    //         let rota: string = `${path}/feriados/validar/${ano}/${mes}/${dia}`;
    //         let status: number = HttpStatus.BAD_GATEWAY;
    //         let resposta = new ErrorMessage( msg, rota, status );
    //         res
    //             .status( HttpStatus.BAD_GATEWAY )
    //             .send( resposta );
    //     }
    // }



    @Get( '/tarifas' )
    @ApiOperation( {
        description: "Lista as tarifas. \nOrigem: banco de dados ",
        title: "Tarifas"
    } )
    @ApiResponse( {
        status: 302,
        description: "Tarifas encontradas",
        type: Tarifa,
        isArray: true
    } )
    @ApiResponse( {
        status: 404,
        description: "Tarifas não encontradas",
        type: ErrorMessage
    } )

    async getTarifas ( @Res() res ) {
        try {
            let tarifas: Tarifa[] = await this.Service.getTarifas();
            if ( tarifas.length > 0 ) {
                res
                    .status( HttpStatus.FOUND )
                    .send( tarifas );
            } else {
                let msg: string = "Nenhuma tarifa encontrada na busca";
                let rota: string = `${path}/tarifas`;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta )
            }
        } catch ( err ) {
            let msg: string = err.message;
            let rota: string = `${path}/tarifas`;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta );
        }
    }

}
