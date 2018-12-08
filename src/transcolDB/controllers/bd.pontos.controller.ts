import { Controller, Get, Res, HttpStatus, Param } from "@nestjs/common";
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { Endpoints } from '../../commom/configs/endpoints.config';
import { PontoService } from "../services/ponto.service";
import { Itinerario } from "../../ceturb/models/itinerarios.model.Dto";
import { ErrorMessage } from "../../commom/DTOs/errorMessages/errorMessage";
const raiz: string = new Endpoints().rotaRaiz;
const path: string = `${raiz}/pontos`;

@Controller( `${raiz}/pontos` )
@ApiUseTags( "Pontos" )
export class BDPontosController {
  constructor( private readonly pontoService: PontoService ) { }

  @Get( '/:codigo_ponto/itinerarios' )
  @ApiOperation( {
    description: "Listar todos os itinerarios que passam por um ponto. \nOrigem: banco de dados",
    title: "Itinerarios por Ponto"
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
    name: 'codigo_ponto',
    description: 'codigo do ponto de parada',
    required: true,
    type: 'number'
  } )
  async getItinerariosByCodigo ( @Res() res, @Param( 'codigo_ponto' ) codigo_ponto ) {
    try {
      let itinerarios = await this.pontoService.getItinerariosPorPonto( codigo_ponto );
      if ( itinerarios.length > 0 ) {
        res
          .status( HttpStatus.FOUND )
          .send( itinerarios );
      } else {
        let msg: string = "Nenhum itinerario encontrado na busca";
        let rota: string = `${path}/${codigo_ponto}/itinerarios`;
        let status: number = HttpStatus.NOT_FOUND;
        let resposta = new ErrorMessage( msg, rota, status );
        res
          .status( HttpStatus.NOT_FOUND )
          .send( resposta )
      }
    } catch ( err ) {
      let msg: string = err.message;
      let rota: string = `${path}/${codigo_ponto}/itinerarios`;
      let status: number = HttpStatus.BAD_GATEWAY;
      let resposta = new ErrorMessage( msg, rota, status );
      res
        .status( HttpStatus.BAD_GATEWAY )
        .send( resposta );
    }
  }
}
