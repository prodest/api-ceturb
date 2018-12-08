import { Injectable, HttpService, Body, HttpException, HttpStatus } from "@nestjs/common";
import * as request from 'request-promise';

@Injectable()
export class PontoService {
  private urlPontos = "https://gvbus.geocontrol.com.br/pontual-api-web/listarPontosDeParada";
  private urlPontosItinerarios = 'https://gvbus.geocontrol.com.br/pontual-api-web/listarAssociacaoPontoItinerario';
  private readonly urlArea = 'https://buscabus.geocontrol.com.br/svc/json/db/pesquisarPontosDeParada';

  public async retornar_pontos () {
    return request.get( this.urlPontos, { json: true } );
  }

  /**
    * Método que busca pontos dentro de uma area do mapa na API da geocontrol,
    * O formato da requisição deve estar da seguinte maneira:
    *  {
    *  "envelope": [­40.309548147161195,­20.282983882640348,­40.29407716556429,­20.274791927077008]
    *  // Array de double com 4 posições (left, top, right, bottom) representando as 
    *  // coordenadas do retângulo dentro do qual devem estar os pontos de parada          
    *  }
    * @param body corpo da requisição contendo as coordenadas
  */
  async BuscaPontosPorArea ( coordenadas: number[] ) {
    const options = {
      method: 'POST',
      uri: this.urlArea,
      body: {
        envelope: coordenadas
      },
      json: true
    };
    return request( options );
  }

  public async retornar_pontosItinerarios () {

    return request.get( this.urlPontosItinerarios, { json: true } );

  }

}
