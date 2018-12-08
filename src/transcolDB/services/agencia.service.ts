import { Injectable } from '@nestjs/common';
import { Agencia } from '../models/Agencia.model';
import { Feriado } from '../models/Feriado.model';
import { Contato } from '../models/Contato.model';
import { Tarifa } from '../models/Tarifa.model';
import { FeriadoResponse } from '../../transcolDB/models/Dto/FeriadoResponse.dto';

@Injectable()
export class AgenciaService {

    async getAgencias () {
        let agencias: Agencia[];
        try {
            agencias = await Agencia.find();
            return agencias;
        } catch ( err ) {
            throw new Error( `Erro ao buscar agencias\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }

    async getFeriados () {
        let feriados: Feriado[];
        try {
            feriados = await Feriado.find();
            return feriados;
        } catch ( err ) {
            throw new Error( `Erro ao buscar feriados\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }

    }

    async getContatos () {
        let contatos: Contato[];
        try {
            contatos = await Contato.find();
            return contatos;
        } catch ( err ) {
            throw new Error( `Erro ao buscar contatos\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }

    async getTarifas () {
        let tarifas: Tarifa[];
        try {
            tarifas = await Tarifa.find();
            return tarifas;
        } catch ( err ) {
            throw new Error( `Erro ao buscar tarifas\n Erro: ${err.name}\n Mensagem: ${err.message}\n O Banco está conectado e acessível ?` );
        }
    }

    //desativado na versão 1.11.9
    // /**
    //  * Método que verifica se uma data consultada é um feriado.
    //  * @param d string de data no formato 'YYYY-MM-DD"
    //  * @returns retorna um objeto FeriadoResponse com a data pesquisada e um booleano informando se é um feriado
    //  */
    // async CheckFeriado ( d: string ) {
    //     let resposta = new FeriadoResponse();
    //     resposta.data = d;
    //     let hoje: Feriado;

    //     try {
    //         hoje = await Feriado.findOne( { where: { data: d } } );
    //     } catch ( err ) {
    //         throw new Error( `Falha na consulta de feriados: ${err.message}` );
    //     }

    //     if ( hoje == undefined ) {
    //         resposta.feriado = false;
    //     } else {
    //         resposta.feriado = true;
    //     }
    //     return resposta;
    // }
}
