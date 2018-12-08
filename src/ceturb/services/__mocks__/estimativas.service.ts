import { Injectable } from '@nestjs/common';

@Injectable()
export class EstimativasService {
    private readonly url = 'https://buscabus.geocontrol.com.br/svc/estimativas';

    /**
     * Método que busca estimativas por ponto de origem na API da geocontrol
     * @param id id do ponto de origem
     */
    async ObterPorOrigem ( Params ) {
        const resposta = {
            "horarioDoServidor": 1485282858181, // Horário do relógio no servidor no formato "millis"  
            "pontoDeOrigemId": 726, // Id do ponto de origem 
            "estimativas": [
                {
                    "veiculo": "14197", // Rótulo do identificador do ônibus cuja estimativa de passagem está sendo gerada 
                    "acessibilidade": false, // Boolean que informa se o ônibus está adaptado para o uso cadeirantes 
                    "itinerarioId": 1353, // Id do itinerário sendo realizado 
                    "horarioDePartida": 1485285120000, // Horário programado de início da viagem 
                    "horarioNaOrigem": 1485285591506, // Horário estimado de passagem do ônibus no ponto de origem 
                    "horarioDaTransmissao": 1485285120000 // Horário do pacote de rastreamento do ônibus 
                },
                {
                    "veiculo": "14132",
                    "acessibilidade": true,
                    "itinerarioId": 1353,
                    "horarioDePartida": 1485285840000,
                    "horarioNaOrigem": 1485286311506,
                    "horarioDaTransmissao": 1485285840000
                },
            ]
        }
        if ( Params.id_origem != 0 ) {
            return resposta;
        } else {
            return { estimativas: [] };
        }
    }




    /**
     * Método que busca estimativas por pontos de origem e destino na API da geocontrol
     * @param body corpo da requisição contendo ids do ponto de origem e destino
     */
    async ObterPorOrigemEDestino ( params ) {
        const resposta = {
            "horarioDoServidor": 1485282858181, // Horário do relógio no servidor no formato "millis"  
            "pontoDeOrigemId": 452, // Id do ponto de origem 
            "pontoDeDestinoId": 452, // Id do ponto de destino 
            "estimativas": [
                {
                    "veiculo": "14197", // Rótulo do identificador do ônibus cuja estimativa de passagem está sendo gerada 
                    "acessibilidade": false, // Boolean que informa se o ônibus está adaptado para o uso cadeirantes 
                    "itinerarioId": 599, // Id do itinerário sendo realizado 
                    "horarioDePartida": 1485285120000, // Horário programado de início da viagem 
                    "horarioNaOrigem": 1485285591506, // Horário estimado de passagem do ônibus no ponto de origem 
                    "horarioNoDestino": 1485285064194, // Horário estimado de passagem do ônibus no ponto de destino 
                    "horarioDaTransmissao": 1485285120000 // Horário do pacote de rastreamento do ônibus 
                },
                {
                    "veiculo": "14132",
                    "acessibilidade": true,
                    "itinerarioId": 599,
                    "horarioDePartida": 1485285840000,
                    "horarioNaOrigem": 1485286311506,
                    "horarioNoDestino": 1485285064194,
                    "horarioDaTransmissao": 1485285840000
                },
            ]
        }
        if ( parseInt( params.id_destino ) != 0 && parseInt( params.id_origem ) != 0 )
            return resposta;
        else return { estimativas: [] };
    }


    /**
         * Método que busca estimativas por pontos de origem e destino na API da geocontrol
         * @param body corpo da requisição contendo ids do ponto de origem e destino
         */
    async ObterPorOrigemELinha ( params ) {
        const resposta = {
            "horarioDoServidor": 1485282858181, // Horário do relógio no servidor no formato "millis"  
            "pontoDeOrigemId": 452, // Id do ponto de origem 
            "linhaId": 669, // Id da linha 
            "estimativas": [
                {
                    "veiculo": "14197", // Rótulo do identificador do ônibus cuja estimativa de passagem está sendo gerada 
                    "acessibilidade": false, // Boolean que informa se o ônibus está adaptado para o uso cadeirantes 
                    "itinerarioId": 599, // Id do itinerário sendo realizado 
                    "horarioDePartida": 1485285120000, // Horário programado de início da viagem 
                    "horarioNaOrigem": 1485285591506, // Horário estimado de passagem do ônibus no ponto de origem 
                    "horarioDaTransmissao": 1485285120000 // Horário do pacote de rastreamento do ônibus 
                },
                {
                    "veiculo": "14132",
                    "acessibilidade": true,
                    "itinerarioId": 599,
                    "horarioDePartida": 1485285840000,
                    "horarioNaOrigem": 1485286311506,
                    "horarioDaTransmissao": 1485285840000
                },
            ]
        }
        if ( parseInt( params.id_linha ) != 0 && parseInt( params.id_origem ) != 0 )
            return resposta;
        else return { estimativas: [] }
    }
}
