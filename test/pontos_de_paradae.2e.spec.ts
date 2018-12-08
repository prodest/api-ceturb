import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { PontoService } from '../src/ceturb/services/ponto.ceturb.service';
import { Endpoints } from '../src/commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;
const feature = loadFeature( "./test/features/pontos_de_parada.feature" );
jest.mock( '../src/ceturb/services/ponto.ceturb.service' );

//--------------------------------------------------------------------//
//---------------------mocks GLOBAIS obrigatórios --------------------//
//--------------------------------------------------------------------//
jest.mock( '../src/ceturb/ceturb.module' );
jest.mock( "../src/transcolDB/transcolDB.module" );
jest.mock( '../src/app.module' );
jest.mock( '../src/ceturb/services/gtfs.service' );
jest.mock( '../src/ceturb/services/minio.service' );
//--------------------------------------------------------------------//
//---------------------mocks GLOBAIS obrigatórios --------------------//
//--------------------------------------------------------------------//



let pontos: any;
let resposta: any;

defineFeature( feature, test => {
  let module: TestingModule;
  let app: INestApplication;

  beforeAll( async () => {
    module = await Test.createTestingModule( {
      imports: [ AppModule ]
    } ).compile();
    app = module.createNestApplication();
    await app.init();
  } );

  test( "Retornar todos os pontos ativos registrados.", ( {
    given,
    when,
    then
  } ) => {
    given( "que existam pontos de parada registrados.", async () => {
      PontoService.prototype.retornar_pontos = jest.fn().mockImplementationOnce( () => {

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

      } );
      resposta = await request( app.getHttpServer() ).get( `${raiz}/pontos` );
      expect( resposta.status || resposta.body.status ).toBe( 200 );
    } );

    when( "o usuário solicitar as informações sobre os pontos.", async () => {
      pontos = JSON.parse( JSON.stringify( resposta.body ) );
    } );

    then( "o sistema retorna todos os pontos ativos.", () => {
      expect( pontos.length ).toBeGreaterThan( 0 );
    } );
  } );


  test( "Não existem pontos ativos registrados.", ( { given, when, then } ) => {

    given( "não existem pontos registrados", async () => {
      PontoService.prototype.retornar_pontos = jest.fn().mockImplementationOnce( () => {
        throw new Error( "nenhum registro encontrado" );
      } );
      resposta = await request( app.getHttpServer() ).get( `${raiz}/pontos` );
      expect( resposta.body.status ).toBe( 204 );
    } );

    when( "o usuário solicitar as informações sobre os pontos.", async () => {
      pontos = JSON.parse( JSON.stringify( resposta.body ) );
    } );

    then( "o sistema retorna uma mensagem informando que não há registros", () => {
      expect( resposta.body.mensagem ).toBe( "nenhum registro encontrado" );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
