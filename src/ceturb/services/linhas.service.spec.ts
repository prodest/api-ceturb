import { Test, TestingModule } from '@nestjs/testing';
import { LinhasService } from './linhas.service';
import { HttpService } from '@nestjs/common';
jest.mock( "./linhas.service" );

describe( 'LinhasService', () => {
  let service: LinhasService;

  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ HttpService, LinhasService ],
    } ).compile();
    service = module.get<LinhasService>( LinhasService );
  } );

  it( 'retornar_linhas() deve retornar um array maior do que 0', async () => {
    LinhasService.prototype.retornar_linhas = jest
      .fn()
      .mockImplementationOnce( () => {
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
      } );
    let linhas = [];
    linhas = await service.retornar_linhas();
    expect( linhas.length ).toBeGreaterThan( 0 );
  } );

  it( 'busca_itinerarios() deve retornar um array maior que 0', async () => {
    LinhasService.prototype.busca_itinerario = jest
      .fn()
      .mockImplementationOnce( () => {
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
      } );

    let itinerarios = [];
    let linha = 500;
    itinerarios = await service.busca_itinerario( linha );
    expect( itinerarios.length ).toBeGreaterThan( 0 );
  } );

  it( 'O retorno de horários deve ser maior do que 0', async () => {
    LinhasService.prototype.lista_horario = jest
      .fn()
      .mockImplementationOnce( () => {
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
      } );

    let horarios = []
    let linha = 500
    horarios = await service.lista_horario( linha );
    expect( horarios.length ).toBeGreaterThan( 0 );
  } );

  it( 'O retorno de horários deve ser maior do que 0', async () => {
    LinhasService.prototype.lista_horarioObs = jest
      .fn()
      .mockImplementationOnce( () => {
        let data = [ { "teste": "teste" }, { "teste": "teste" }, { "teste": "teste" } ];
        return data;
      } );

    let horariosObs = []
    let linha = 500
    horariosObs = await service.lista_horarioObs( linha );
    expect( horariosObs.length ).toBeGreaterThan( 0 );
  } );

} );

