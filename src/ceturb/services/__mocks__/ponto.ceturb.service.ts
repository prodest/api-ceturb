import { Injectable, HttpService, Body } from "@nestjs/common";

@Injectable()
export class PontoService {

  public async retornar_pontos () {

    let obj1 = {
      "id": 5281,
      "codigo": "000025",
      "municipio": "Vila Velha",
      "logradouro": "Rua Paulo Vinhas",
      "referencia": "",
      "longitude": -40.3350331363673,
      "latitude": -20.447214118107,
      "azimute": -68,
      "terminal": false
    }

    let obj2 = {
      "id": 404,
      "codigo": "110001",
      "municipio": "Vitoria",
      "logradouro": "Avenida Paulino Muller",
      "referencia": "Procuradoria da Republica do Espírito Santo - MPF",
      "longitude": -40.3196039018834,
      "latitude": -20.3170426845619,
      "azimute": -14,
      "terminal": false
    }

    let obj3 = {
      "id": 481,
      "codigo": "110002",
      "municipio": "Vitoria",
      "logradouro": "Avenida Paulino Muller",
      "referencia": "Procuradoria da República do Espírito Santo - MPF",
      "longitude": -40.3198290398441,
      "latitude": -20.3164543118005,
      "azimute": 170,
      "terminal": false
    }

    return [ obj1, obj2, obj3 ];
  }

  async BuscaPontosPorArea ( envelope: number[] ) {
    var obj = {
      "pontosDeParada": [ 726, 727, 742, 743 ] // Array contendo os ids dos pontos de parada 
    }
    return obj;
  }


  public async retornar_pontosItinerarios () {

    let obj1 = { "itinerarioId": 448, "ordem": 1, "pontoDeParadaId": 3752, "embarque": true, "desembarque": false }

    let obj2 = { "itinerarioId": 448, "ordem": 2, "pontoDeParadaId": 3750, "embarque": true, "desembarque": true }

    let obj3 = { "itinerarioId": 448, "ordem": 3, "pontoDeParadaId": 3753, "embarque": true, "desembarque": true }

    return [ obj1, obj2, obj3 ];
  }





}
