import { Injectable } from '@nestjs/common';
import { Itinerario } from '../../models/Itinerario.model';
import { Ponto } from '../../models/Ponto.model';

@Injectable()
export class PontoService {
    /**
     * Método que busca todos os itinerarios que passam em um ponto, independende de horario.
     * @param codigo_ponto codigo do ponto de parada
     */
    async getItinerariosPorPonto ( codigo_ponto: string ) {
        if ( codigo_ponto != '0' ) {
            let itinerarios: Itinerario[] = new Array();
            let itinerario: Itinerario = new Itinerario();

            itinerario.id = 1;
            itinerario.id_geocontrol = 1;
            itinerario.codigo = '1';
            itinerario.bandeira = 'caçaroca';
            itinerario.linha_id = 69;

            itinerarios.push( itinerario );
            return itinerarios;
        } else return [];
    }
}
