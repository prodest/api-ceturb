import { Injectable } from '@nestjs/common';
import { Itinerario } from '../../models/Itinerario.model';
import { Viagem } from '../../models/Viagem.model';
import { PontoGeografico } from '../../../transcolDB/models/PontoGeografico.model';

@Injectable()
export class ItinerarioService {
    /*
        async getItinerarios () {
            let resposta: Itinerario[] = new Array();
            let entidade: Itinerario = new Itinerario();
    
            entidade.id = 1;
            entidade.id_geocontrol = 1;
            entidade.codigo = '123';
            entidade.bandeira = 'caçaroca';
            entidade.linha_id = 69;
    
            resposta.push( entidade );
            return resposta;
        }
    */
    async getItinerariosByCodigo ( cod: string ) {
        let resposta: Itinerario[] = new Array();
        let entidade: Itinerario = new Itinerario();

        entidade.id = 1;
        entidade.id_geocontrol = 1;
        entidade.codigo = cod;
        entidade.bandeira = 'caçaroca';
        entidade.linha_id = 69;

        resposta.push( entidade );
        return resposta;
    }

    async getViagemByItinerarioCode ( cod: string ) {
        let viagems: Viagem[] = new Array();
        let viagem = new Viagem();
        viagem.id = 1;
        viagem.itinerario_id = 1;
        viagem.horadasaida = '00:00:00';
        viagem.horadachegada = '00:00:00';
        viagem.domingo = false;
        viagem.sabado = false;
        viagem.diautil = true;
        viagem.acessibilidade = true;
        viagem.veiculo = '00000';
        viagems.push( viagem );
        return viagems;
    }


    /**
         * Método que busca os shapes de um itinerario específico
         * @param codigo codigo do itinerario
         * @returns array PontoGeografico
         */
    async getShapesPorItinerario ( codigo_itinerario: string ) {
        if ( codigo_itinerario != '0' ) {
            let resposta: PontoGeografico[] = new Array();
            let entidade: PontoGeografico = new PontoGeografico();

            entidade.altitude = '40';
            entidade.id = 1;
            entidade.itinerario_id = 1;
            entidade.latitude = '-40.3452334545';
            entidade.longitude = '-20.3425324532';
            entidade.sequencia = 1;

            resposta.push( entidade );
            return resposta;
        } else {
            return [];
        }
    }
}
