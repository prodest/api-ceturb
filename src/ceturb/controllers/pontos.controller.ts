import { Controller, Get, Res, HttpStatus, Param } from "@nestjs/common";
import { PontoService } from '../services/ponto.ceturb.service';
import { ApiUseTags, ApiOperation, ApiResponse, ApiImplicitParam } from '@nestjs/swagger';
import { Endpoints } from '../../commom/configs/endpoints.config';
import { Ponto } from "../../ceturb/models/dto/ponto.entity";
import { ErrorMessage } from "../../commom/DTOs/errorMessages/errorMessage";
import { PontoItinerario } from "../../ceturb/models/pontoItinerario.entity";
const raiz: string = new Endpoints().rotaRaiz;
const path: string = `${raiz}/pontos`;

@Controller( `${raiz}/pontos` )
@ApiUseTags( "Pontos" )
export class PontosController {

  constructor( private readonly pontoService: PontoService ) { }

  @Get()
  @ApiOperation( {
    description: "lista os pontos de parada ativos. \nOrigem: ceturb/geocontrol",
    title: "Pontos de parada"
  } )
  @ApiResponse( {
    status: 200,
    description: "Pontos encontrados",
    type: Ponto,
    isArray: true
  } )
  @ApiResponse( {
    status: 204,
    description: "Pontos não encontrados",
    type: ErrorMessage
  } )

  async retornar_pontos ( @Res() res ) {
    try {
      res
        .status( HttpStatus.OK )
        .send( await this.pontoService.retornar_pontos() );
    }
    catch ( error ) {
      let msg: string = error.message;
      let rota: string = path;
      let status: number = HttpStatus.BAD_GATEWAY;
      let resposta = new ErrorMessage( msg, rota, status );
      res
        .status( HttpStatus.BAD_GATEWAY )
        .send( resposta );
    }
  }

  @Get( '/area/:ponto_geografico_esquerdo_inferior/:ponto_geografico_esquerdo_superior/:ponto_geografico_direito_superior/:ponto_geografico_direito_inferior' )
  @ApiOperation( {
    description: "Retorna um array com os ids dos pontos de parada dentro da area do mapa especificada."
      + "\nAlguns valores para teste: \n"
      + "ponto_geografico_esquerdo_inferior: -20.282983882640348 \n"
      + "ponto_geografico_esquerdo_superior: -40.309548147161195 \n"
      + "ponto_geografico_direito_superior: -40.29407716556429\n"
      + "ponto_geografico_direito_inferior: -20.274791927077008 \n"
      + "A URL para essa busca ficaria assim:\n"
      + "/area/-40.309548147161195/-20.282983882640348/-40.29407716556429/-20.274791927077008",
    title: "Pontos de parada por Area do mapa"
  } )
  @ApiResponse( {
    status: 200,
    description: "Pontos encontrados",
    type: Ponto,
    isArray: true
  } )
  @ApiResponse( {
    status: 204,
    description: "Pontos não encontrados",
    type: ErrorMessage
  } )
  @ApiResponse( {
    status: 400,
    description: "Parâmetros fora do formato numérico",
    type: ErrorMessage
  } )
  @ApiImplicitParam( {
    name: 'ponto_geografico_direito_inferior',
    description: 'Coordenada do ponto geográfico direito inferior (SIGNED FLOAT)',
    required: true,
    type: 'number'
  } )
  @ApiImplicitParam( {
    name: 'ponto_geografico_direito_superior',
    description: 'Coordenada do ponto geográfico direito superior (SIGNED FLOAT)',
    required: true,
    type: 'number'
  } )
  @ApiImplicitParam( {
    name: 'ponto_geografico_esquerdo_superior',
    description: 'Coordenada do ponto geográfico esquerdo superior (SIGNED FLOAT)',
    required: true,
    type: 'number'
  } )
  @ApiImplicitParam( {
    name: 'ponto_geografico_esquerdo_inferior',
    description: 'Coordenada do ponto geográfico esquerdo inferior (SIGNED FLOAT)',
    required: true,
    type: 'number'
  } )
  async retornar_pontos_por_area_do_mapa ( @Res() res, @Param() params ) {
    let Left: number;
    let Top: number;
    let Right: number;
    let Bottom: number;

    try {
      Left = parseFloat( params.ponto_geografico_esquerdo_inferior );
      Top = parseFloat( params.ponto_geografico_esquerdo_superior );
      Right = parseFloat( params.ponto_geografico_direito_superior );
      Bottom = parseFloat( params.ponto_geografico_direito_inferior );
      let coordenadas = [ Left, Top, Right, Bottom ];

      //verifica se algum valor informado não era um numero
      if ( !Number.isNaN( Left ) && !Number.isNaN( Top )
        && !Number.isNaN( Right ) && !Number.isNaN( Bottom ) ) {
        res
          .status( HttpStatus.OK )
          .send( await this.pontoService.BuscaPontosPorArea( coordenadas ) );
      } else {
        let msg: string = "Um dos parâmetros informados não era um valor válido";
        let rota: string = `${path}/area/${Left}/${Top}/${Right}/${Bottom}`;
        let status: number = HttpStatus.BAD_REQUEST;
        let resposta = new ErrorMessage( msg, rota, status );
        res
          .status( HttpStatus.BAD_REQUEST )
          .send( resposta );
      }
    }
    catch ( error ) {
      let msg: string = error.message;
      let rota: string = `${path}/area/${Left}/${Top}/${Right}/${Bottom}`;
      let status: number = HttpStatus.BAD_REQUEST;
      let resposta = new ErrorMessage( msg, rota, status );
      res
        .status( HttpStatus.NOT_FOUND )
        .send( resposta );
    }
  }

  @Get( '/itinerarios' )
  @ApiOperation( {
    description: 'retornar todas as associações entre pontos e itinerários',
    title: 'Pontos associados a Itinerários',
  } )
  @ApiResponse( {
    status: 200,
    description: 'Lista de associações entre pontos e itinerários',
    type: PontoItinerario,
    isArray: true
  } )
  @ApiResponse( {
    status: 204,
    description: 'Dados não encontrados',
    type: ErrorMessage
  } )
  async retornar_pontosItinerarios ( @Res() res ) {
    try {
      let dados = await this.pontoService.retornar_pontosItinerarios();
      res
        .status( HttpStatus.OK )
        .send( dados );
    } catch ( error ) {
      let msg: string = error.message;
      let rota: string = path;
      let status: number = HttpStatus.BAD_GATEWAY;
      let resposta = new ErrorMessage( msg, rota, status );
      res
        .status( HttpStatus.BAD_GATEWAY )
        .send( resposta );
    }
  }

}
