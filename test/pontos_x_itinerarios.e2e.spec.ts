import { defineFeature, loadFeature } from 'jest-cucumber';
import { Test, TestingModule } from '@nestjs/testing';
import request from 'supertest';
import { INestApplication } from '@nestjs/common';
import { AppModule } from '../src/app.module';
import { PontoService } from '../src/ceturb/services/ponto.ceturb.service';
import { Endpoints } from '../src/commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;
const feature = loadFeature( './test/features/pontos_x_itinerarios.feature' );
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




let pontosItinerarios: any;
let resposta: any;

defineFeature( feature, test => {
  let module: TestingModule;
  let app: INestApplication;

  beforeAll( async () => {
    module = await Test.createTestingModule( {
      imports: [ AppModule ],
    } ).compile();
    app = module.createNestApplication();
    await app.init();
  } );

  test( 'Retornar todas as associações entre pontos e itinerários.', ( { given, when, then, } ) => {

    given(
      'que existam associações entre pontos e itinerários registrados.', async () => {
        PontoService.prototype.retornar_pontosItinerarios =
          jest.fn().mockImplementationOnce( () => {
            let obj1 = { "itinerarioId": 448, "ordem": 1, "pontoDeParadaId": 3752, "embarque": true, "desembarque": false }

            let obj2 = { "itinerarioId": 448, "ordem": 2, "pontoDeParadaId": 3750, "embarque": true, "desembarque": true }

            let obj3 = { "itinerarioId": 448, "ordem": 3, "pontoDeParadaId": 3753, "embarque": true, "desembarque": true }

            return [ obj1, obj2, obj3 ];
          } );
        resposta = await request( app.getHttpServer() ).get( `${raiz}/pontos/itinerarios` );
        expect( resposta.status ).toBe( 200 );
      },
    );

    when(
      'o usuário solicitar as informações sobre as associações entre pontos e itinerários.',
      async () => {
        pontosItinerarios = JSON.parse( JSON.stringify( resposta.body ) );
      },
    );

    then(
      'o sistema retorna todas as associações entre pontos e itinerários.',
      () => {
        expect( pontosItinerarios.length ).toBeGreaterThan( 0 );
      },
    );
  } );




  afterAll( async () => {
    await app.close();
  } );

} );
