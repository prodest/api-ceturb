import { Injectable } from '@nestjs/common';

@Injectable()
export class ItinerariosService {

    public async lista_itinerario () {
        let obj1 = {
            "id": 1981,
            "codigo": "400I",
            "bandeira": "PRAIA DE SANTA HELENA",
            "linhaId": 716
        }

        let obj2 = {
            "id": 1982,
            "codigo": "400I_C",
            "bandeira": "PRAIA DE SANTA HELENA",
            "linhaId": 716
        }

        let obj3 = {
            "id": 1984,
            "codigo": "400V",
            "bandeira": "VILA VELHA",
            "linhaId": 716
        }

        return [ obj1, obj2, obj3 ];
    }

    public async busca_itinerario ( linha: number ) {
        if ( linha > 0 ) {
            let obj1 = {
                "Linha": "0500",
                "Sentido": "I",
                "Sequencia": 1,
                "Tipo": "D",
                "Desc_Via": "T. VILA VELHA",
                "Descricao_Linha": "T. VILA VELHA / T. ITACIBÁ VIA 3ª PONTE",
                "Mensagem": "Processamento sem Erro"
            }

            let obj2 = {
                "Linha": "0500",
                "Sentido": "I",
                "Sequencia": 2,
                "Tipo": "D",
                "Desc_Via": "RUA CABO AILSON SIMÕES",
                "Descricao_Linha": "T. VILA VELHA / T. ITACIBÁ VIA 3ª PONTE",
                "Mensagem": "Processamento sem Erro"
            }

            return [ obj1, obj2 ];
        } else return [];
    }
}

