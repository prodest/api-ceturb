import { Injectable, HttpException, HttpStatus } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class ViagensService {
    private readonly url: string = "https://gvbus.geocontrol.com.br/pontual-api-web/listarViagens";
    //private readonly url7dias = 'https://gvbus.geocontrol.com.br/pontual-api-web/listarViagensProximosSeteDias';

    public async retornar_viagens () {
        return request.get( this.url, { json: true } );
    }
    /*
        public async retornar_viagens_7dias () {
            return request.get( this.url7dias, { json: true } );
        }
    */
}

