import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { Controller, Get, Res, HttpStatus, Param } from "@nestjs/common";
import { EstimativasService } from '../services/estimativas.service';
import { Endpoints } from '../../commom/configs/endpoints.config';
import { ErrorMessage } from '../../commom/DTOs/errorMessages/errorMessage';
import { estimativasDto } from '../../ceturb/models/dto/estimativas.dto';
const raiz: string = new Endpoints().rotaRaiz;
const path: string = `${raiz}/estimativas`;

@Controller( `${raiz}/estimativas` )
@ApiUseTags( 'Estimativas' )
export class EstimativasController {
    constructor( private readonly Service: EstimativasService ) { }

    @Get( "/ponto/:id_origem/origem" )
    @ApiOperation( {
        description: "retornar estimativas por ponto de origem. \nOrigem: Geocontrol",
        title: "Estimativas por Origem"
    } )
    @ApiResponse(
        {
            status: 200,
            description: "Estimativas encontradas",
            type: estimativasDto,
            isArray: true
        } )
    @ApiResponse( {
        status: 404,
        description: "Estimativas não encontrados",
        type: ErrorMessage
    } )
    @ApiImplicitParam( {
        name: 'id_origem',
        description: 'Numero de identificação do ponto de origem',
        required: true,
        type: 'number'
    } )

    async retornar_estimativas_por_origem ( @Res() res, @Param() params ) {
        try {
            let consulta = await this.Service.ObterPorOrigem( params );
            if ( consulta.estimativas.length > 0 ) {
                res
                    .status( HttpStatus.OK )
                    .send( consulta );
            } else {
                let msg: string = "Estimativas não encontradas";
                let rota: string = `${path}/ponto/${params.id_origem}/origem`;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta );
            }
        }
        catch ( error ) {
            let msg: string = error.message;
            let rota: string = `${path}/ponto/${params.id_origem}/origem`;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta );
        }
    }

    @Get( "/ponto/:id_origem/origem/:id_destino/destino" )
    @ApiOperation( {
        description: "retornar estimativas por ponto de origem e ponto destino. \nOrigem: Geocontrol",
        title: "Estimativas por Origem e Destino"
    } )
    @ApiResponse( {
        status: 200,
        description: "Estimativas encontradas",
        type: estimativasDto,
        isArray: true
    } )
    @ApiResponse( {
        status: 404,
        description: "Estimativas não encontrados",
        type: ErrorMessage
    } )
    @ApiImplicitParam( {
        name: 'id_origem',
        description: 'Numero de identificação do ponto de origem',
        required: true,
        type: 'number'
    } )
    @ApiImplicitParam( {
        name: 'id_destino',
        description: 'Numero de identificação do ponto de destino',
        required: true,
        type: 'number'
    } )
    async retornar_estimativas_por_origem_e_destino ( @Res() res, @Param() params ) {
        try {
            let consulta = await this.Service.ObterPorOrigemEDestino( params );
            if ( consulta.estimativas.length > 0 ) {
                res
                    .status( HttpStatus.OK )
                    .send( consulta );
            } else {
                let msg: string = "Estimativas não encontradas";
                let rota: string = `${path}/ponto/${params.id_origem}/origem/${params.id_destino}/destino`;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta );
            }
        }
        catch ( error ) {
            let msg: string = error.message;
            let rota: string = `${path}/ponto/${params.id_origem}/origem/${params.id_destino}/destino`;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta );
        }
    }


    @Get( "/ponto/:id_origem/origem/:id_linha/linha" )
    @ApiOperation( {
        description: "retornar estimativas por ponto de origem e linha. \nOrigem: Geocontrol",
        title: "Estimativas por Origem e linha"
    } )
    @ApiResponse( {
        status: 200,
        description: "Estimativas encontradas",
        type: estimativasDto,
        isArray: true
    } )
    @ApiResponse( {
        status: 404,
        description: "Estimativas não encontrados",
        type: ErrorMessage
    } )
    @ApiImplicitParam( {
        name: 'id_origem',
        description: 'Numero de identificação do ponto de origem',
        required: true,
        type: 'number'
    } )
    @ApiImplicitParam( {
        name: 'id_linha',
        description: 'Numero de identificação da linha',
        required: true,
        type: 'number'
    } )
    async retornar_estimativas_por_origem_e_linha ( @Res() res, @Param() params ) {
        try {
            let consulta = await this.Service.ObterPorOrigemELinha( params );
            if ( consulta.estimativas.length > 0 ) {
                res
                    .status( HttpStatus.OK )
                    .send( consulta );
            } else {
                let msg: string = "Estimativas não encontradas";
                let rota: string = `${path}/ponto/${params.id_origem}/origem/${params.id_linha}/linha`;
                let status: number = HttpStatus.NOT_FOUND;
                let resposta = new ErrorMessage( msg, rota, status );
                res
                    .status( HttpStatus.NOT_FOUND )
                    .send( resposta );
            }
        }
        catch ( error ) {
            let msg: string = "AAAAAAAAAAAA" + error.message;
            let rota: string = `${path}/ponto/${params.id_origem}/origem/${params.id_linha}/linha`;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta );
        }
    }
}
