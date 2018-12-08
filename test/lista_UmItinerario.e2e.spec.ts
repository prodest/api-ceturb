import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { Endpoints } from '../src/commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;
const feature = loadFeature( "./test/features/buscaUmItinerario.feature" );
jest.mock( '../src/ceturb/services/linhas.service' );

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




let itinerarios: any;
let resposta: any;
let linha: number;

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

  test( "Existem itinerários registrados de uma linha", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as informações do itinerario de uma linha", async () => {
      linha = 500;
    } );

    when( "Eu pesquisar uma linha", async () => {
      resposta = await request( app.getHttpServer() ).get( `${raiz}/linha/${linha}/itinerarios` );
    } );

    then( "retorna o itinerário cadastrado de uma linha", () => {
      itinerarios = JSON.parse( JSON.stringify( resposta.body ) );
      expect( itinerarios.length ).toBeGreaterThan( 0 );
    } );
  } );


  test( "Não existem itinerários registrados para a linha", async ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações do itinerario de uma linha", async () => {
      linha = 0; //propositalmente uma linha invalida para forçar o cenário de erro
    } );

    given( "não há registro de itinerários para essa linha", async () => {
      resposta = await request( app.getHttpServer() ).get( `${raiz}/linha/${linha}/itinerarios` );
      expect( resposta.status ).toBe( 404 );
    } );

    when( "Eu pesquisar uma linha", async () => {
      //pesquisa ja feita acima
    } );

    then( "retorna uma mensagem informando que não há registros", async () => {
      expect( resposta.body.mensagem ).toBe( "Não há registros de itinerarios para essa linha" );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
