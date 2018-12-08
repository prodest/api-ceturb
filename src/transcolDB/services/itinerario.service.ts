import { Injectable } from '@nestjs/common';
import { Itinerario } from '../models/Itinerario.model';
import { Viagem } from '../models/Viagem.model';
import { PontoGeografico } from '../../transcolDB/models/PontoGeografico.model';

@Injectable()
export class ItinerarioService {
    /*
        async getItinerarios () {
            let itinerarios: Itinerario[];
            try {
                itinerarios = await Itinerario.find();
                return itinerarios;
            } catch ( err ) {
                throw new Error( `Erro ao buscar itinerarios\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
            }
        }
    */
    /**
     * Método que busca o itinerario de uma linha pelo seu codigo
     * @param cod codigo da linha
     */
    async getItinerariosByCodigo ( cod: string ) {
        let itinerarios: Itinerario[];
        try {
            itinerarios = await Itinerario.find( { where: { codigo: cod } } );
            return itinerarios;
        } catch ( err ) {
            throw new Error( `Erro ao buscar itinerarios\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }

    /**
     * Método que busca as viagems que um itinerário faz
     * @param cod codigo do itinerario
     */
    async getViagemByItinerarioCode ( cod: string ) {
        let itinerario: Itinerario;
        let viagems: Viagem[];
        try {
            itinerario = await Itinerario.findOne( { where: { codigo: cod } } );
            if ( itinerario == undefined )
                return [];
        } catch ( err ) {
            throw new Error( `Erro ao buscar o Itinerário\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
        try {
            viagems = await Viagem.find( { where: { itinerario_id: itinerario.id } } )
            if ( viagems == undefined ) return [];
            return viagems;
        } catch ( err ) {
            throw new Error( `Erro ao buscar viagems\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }

    /**
     * Método que busca os shapes de um itinerario específico
     * @param codigo codigo do itinerario
     * @returns array PontoGeografico
     */
    async getShapesPorItinerario ( codigo_itinerario: string ) {
        let pontogeograficos: PontoGeografico[];
        try {
            let itinerario = await Itinerario.findOne( { where: { codigo: codigo_itinerario } } )
            pontogeograficos = await PontoGeografico.find( { where: { itinerario_id: itinerario.id } } );
            return pontogeograficos;
        } catch ( err ) {
            throw new Error( `Erro ao buscar os pontos geográficos\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }
}
