import { Injectable, HttpService, Res, Body, HttpException, HttpStatus } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class LinhasService {
    private readonly url: string = "https://gvbus.geocontrol.com.br/pontual-api-web/listarLinhas";
    private readonly urlCeturb: string = "http://api.ceturb.es.gov.br/onibus/api/BuscaItinerarios";
    private readonly urlHorario: string = "http://api.ceturb.es.gov.br/onibus/api/BuscaHorarios";
    private readonly urlObservacao: string = "http://api.ceturb.es.gov.br/onibus/api/BuscaHorarioObse";


    public async retornar_linhas () {
        return request.get( this.url, { json: true } );
    }

    public async busca_itinerario ( linha: number ) {
        let newUrl = this.urlCeturb + '/' + linha;
        return request.get( newUrl, { json: true } );
    }

    public async lista_horario ( linha: number ) {
        let newUrl = this.urlHorario + '/' + linha;
        return request.get( newUrl, { json: true } );
    }

    public async lista_horarioObs ( linha: number ) {
        let newUrl = this.urlObservacao + '/' + linha
        return request.get( newUrl, { json: true } );
    }
}

