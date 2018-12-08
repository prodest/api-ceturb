import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from '../src/app.module';
import { Endpoints } from '../src/commom/configs/endpoints.config';
const feature = loadFeature( "./test/features/db.ItinerariosPorPonto.feature" );
const raiz: string = new Endpoints().rotaRaiz;
jest.mock( '../src/transcolDB/services/ponto.service' );

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
let codigo_ponto: string;
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



  test( "Itinerarios encontrados", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de itinerarios que passam por um ponto", async () => {
      codigo_ponto = '123';
      endpoint = `${raiz}/pontos/${codigo_ponto}/itinerarios`;
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
    } );

    then( "recebo uma lista itinerarios", () => {
      expect( resposta.status ).toBe( 302 );
    } );
  } );


  test( "Itinerarios não encontrados", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de itinerarios que passam por um ponto", async () => {
      endpoint = `${raiz}/pontos/${codigo_ponto}/itinerarios`;
    } );

    given( "não há registros", async () => {
      codigo_ponto = '0';
      endpoint = `${raiz}/pontos/${codigo_ponto}/itinerarios`;
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
      expect( resposta.status ).toBe( 404 );
    } );

    then( "recebo uma mensagem de não encontrado", () => {
      expect( resposta.body.mensagem ).toBe( "Nenhum itinerario encontrado na busca" );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
