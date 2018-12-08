import { Injectable } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class ItinerariosService {
    private readonly urlGeoControl: string = "https://gvbus.geocontrol.com.br/pontual-api-web/listarItinerarios";

    public async lista_itinerario () {
        return request.get( this.urlGeoControl, { json: true } );
    }

}

