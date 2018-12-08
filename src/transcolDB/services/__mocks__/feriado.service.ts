import { Injectable } from '@nestjs/common';
import { Feriado } from '../../models/Feriado.model';
import { FeriadoResponse } from '../../models/Dto/FeriadoResponse.dto';

@Injectable()
export class FeriadoService {

    //DESATIVADO NA VERSÃO 1.11.9
    // /**
    //  * Método que verifica se uma data consultada é um feriado.
    //  * @param d objeto Date contendo a data a ser pesquisada
    //  * @returns retorna um objeto com a data pesquisada e um booleano informando se é um feriado
    //  */
    // async CheckFeriado ( d: Date ) {
    //     let resposta = new FeriadoResponse();
    //     if ( d.getDate() == 25 && d.getUTCMonth() == 11 ) { //11 mesmo. Javascript é do carai!
    //         resposta.dia = d;
    //         resposta.feriado = true;
    //     } else {
    //         resposta.dia = d;
    //         resposta.feriado = false;
    //     }
    //     return resposta;
    // }

    /**
     * Método que lista todos os feriados registrados no banco
     * @returns Array de Feriado contendo a lista de todos os feriados
     */
    async getAll () {
        let feriados: Feriado[] = new Array();
        let feriado = new Feriado();
        feriado.id = 1;
        feriados.push( feriado );
        return feriados;
    }
}
