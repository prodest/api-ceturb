import { Injectable } from '@nestjs/common';

@Injectable()
export class LinhasService {

    public async retornar_linhas () {

        let obj1 = {
            "id": 716,
            "codigo": 400,
            "descricao": "VILA VELHA / PRAIA SANTA HELENA"
        }

        let obj2 = {
            "id": 552,
            "codigo": 500,
            "descricao": "T. VILA VELHA / T. ITACIBÁ"
        }

        let obj3 = {
            "id": 544,
            "codigo": 501,
            "descricao": "T. JACARAIPE / T. ITAPARICA  "
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
                "Mensagem": "Processamento sem Erro",
            }
            return [ obj1 ];
        } else return [];
    }


    public async lista_horario ( linha: number ) {
        if ( linha > 0 ) {
            let obj1 = {
                "Linha": '0500',
                "Hora_Saida": "05:05",
                "Terminal_Seq": 1,
                "TP_Horario": 1,
                "Descricao_Hora": "DIAS ÚTEIS",
                "Descricao_Linha": "T. VILA VELHA / T. ITACIBÁ VIA 3ª PONTE",
                "Desc_Terminal": "TERMINAL VILA VELHA",
                "Tipo_Orientacao": " ",
                "Dt_Inicio": "21/08/2016"
            }

            let obj2 = {
                "Linha": '0500',
                "Hora_Saida": "05:20",
                "Terminal_Seq": 1,
                "TP_Horario": 1,
                "Descricao_Hora": "DIAS ÚTEIS",
                "Descricao_Linha": "T. VILA VELHA / T. ITACIBÁ VIA 3ª PONTE",
                "Desc_Terminal": "TERMINAL VILA VELHA",
                "Tipo_Orientacao": " ",
                "Dt_Inicio": "21/08/2016"
            }

            let obj3 = {
                "Linha": '0500',
                "Hora_Saida": "05:35",
                "Terminal_Seq": 1,
                "TP_Horario": 1,
                "Descricao_Hora": "DIAS ÚTEIS",
                "Descricao_Linha": "T. VILA VELHA / T. ITACIBÁ VIA 3ª PONTE",
                "Desc_Terminal": "TERMINAL VILA VELHA",
                "Tipo_Orientacao": " ",
                "Dt_Inicio": "21/08/2016"
            }
            return [ obj1, obj2, obj3 ];
        } else return [];
    }

    public async lista_horarioObs ( linha: number ) {
        if ( linha > 0 ) {
            return [ { "teste": "teste" }, { "teste": "teste" }, { "teste": "teste" } ]
        } else return [];
    }

}

