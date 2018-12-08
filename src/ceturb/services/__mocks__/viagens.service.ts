import { Injectable } from '@nestjs/common';

@Injectable()
export class ViagensService {

    public async retornar_viagens () {
        let obj1 = { "dataAgendada": 1534170720000, "linhaId": 428, "itinerarioId": 692, "dataChegadaEstimada": 1534172461000, "veiculo": "14133", "acessibilidade": true }
        let obj2 = { "dataAgendada": 1534170720000, "linhaId": 457, "itinerarioId": 600, "dataChegadaEstimada": 1534172492000, "veiculo": "14217", "acessibilidade": true }
        let obj3 = { "dataAgendada": 1534170720000, "linhaId": 457, "itinerarioId": 601, "dataChegadaEstimada": 1534172495000, "veiculo": "14087", "acessibilidade": true }
        return [ obj1, obj2, obj3 ];
    }

}
