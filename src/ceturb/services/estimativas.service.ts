import { Injectable, Param } from '@nestjs/common';
import * as request from 'request-promise';

@Injectable()
export class EstimativasService {
    private readonly url = 'https://buscabus.geocontrol.com.br/svc/estimativas';

    /**
     * Método que busca estimativas por ponto de origem na API da geocontrol
     * @param id id do ponto de origem
     */
    async ObterPorOrigem ( Params ) {
        const options = {
            method: 'POST',
            uri: `${this.url}/obterEstimativasPorOrigem`,
            body: { pontoDeOrigemId: parseInt( Params.id_origem ) },
            json: true
        };
        return request( options );
    }




    /**
     * Método que busca estimativas por pontos de origem e destino na API da geocontrol
     * @param params parâmetros da requisição contendo ids do ponto de origem e destino
     */
    async ObterPorOrigemEDestino ( @Param() params ) {
        const options = {
            method: 'POST',
            uri: `${this.url}/obterEstimativasPorOrigemEDestino`,
            body: {
                pontoDeOrigemId: parseInt( params.id_origem ),
                pontoDeDestinoId: parseInt( params.id_destino )
            },
            json: true
        };
        return request( options );
    }



    /**
         * Método que busca estimativas por pontos de origem e destino na API da geocontrol
         * @param params parâmetros da requisição contendo ids do ponto de origem e destino
         */
    async ObterPorOrigemELinha ( @Param() params ) {
        const options = {
            method: 'POST',
            uri: `${this.url}/obterEstimativasPorOrigemELinha`,
            body: {
                pontoDeOrigemId: parseInt( params.id_origem ),
                linhaId: parseInt( params.id_linha )
            },
            json: true
        };
        return request( options );
    }
}
