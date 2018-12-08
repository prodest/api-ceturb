import { Injectable } from '@nestjs/common';
import { Itinerario } from '../models/Itinerario.model';
import { Ponto } from '../models/Ponto.model';

@Injectable()
export class PontoService {

    /**
     * Método que busca todos os itinerarios que passam em um ponto, independende de horario.
     * @param codigo_ponto codigo do ponto de parada
     */
    async getItinerariosPorPonto ( codigo_ponto: string ) {
        try {
            let ponto: Ponto;
            ponto = await Ponto.findOne( { where: { codigo: codigo_ponto } } );
            if ( ponto ) {
                let itinerarios: Itinerario[];
                let query: string;
                query = `SELECT * FROM itinerario JOIN itinerario_ponto `
                    + `ON itinerario.id = itinerario_ponto.itinerario_id `
                    + `JOIN ponto ON `
                    + `itinerario_ponto.ponto_id = ${ponto.id}`;
                itinerarios = await Itinerario.query( query );
                return itinerarios;
            } else {
                return [];
            }
        } catch ( err ) {
            throw new Error( `Erro ao buscar itinerarios\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }
}
