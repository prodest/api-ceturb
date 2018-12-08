import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from '../src/app.module';
import { Endpoints } from '../src/commom/configs/endpoints.config';
const feature = loadFeature( "./test/features/db.itinerarios.getShapes.feature" );
const raiz: string = new Endpoints().rotaRaiz;
jest.mock( '../src/transcolDB/services/itinerario.service' );

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



let resposta: any;
let codigo: string;
let endpoint: string;

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

  test( "Pontos geográficos encontrados", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de pontos geográficos percorridos pelo itinerario", async () => {
      codigo = '123';
      endpoint = `${raiz}/itinerarios/${codigo}/shapes`;
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
    } );

    then( "recebo uma lista de pontos geográficos", () => {
      expect( resposta.status ).toBe( 302 );
    } );
  } );


  test( "Pontos geográficos não encontrados", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de pontos geográficos percorridos pelo itinerario", async () => {
      endpoint = `${raiz}/itinerarios/${codigo}/shapes`;
    } );

    given( "não há registros", async () => {
      codigo = '0';
      endpoint = `${raiz}/itinerarios/${codigo}/shapes`;
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
      expect( resposta.status ).toBe( 404 );
    } );

    then( "recebo uma mensagem de erro", () => {
      expect( resposta.body.mensagem ).toBe( "Nenhuma coordenada encontrada na busca" );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
