import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { Endpoints } from '../src/commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;
const feature = loadFeature( "./test/features/buscaHorario.feature" );
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



let horarios: any;
let linha: number;
let resposta;

defineFeature( feature, test => {
  let module: TestingModule;
  let app: INestApplication;
  let linha;

  beforeAll( async () => {
    module = await Test.createTestingModule( {
      imports: [ AppModule ]
    } ).compile();
    app = module.createNestApplication();
    await app.init();
  } );



  test( "Existem horários de linhas registradas", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações dos horarios de uma linha", async () => {
      linha = 500;
    } );

    when( "eu pesquisar uma linha", async () => {
      resposta = await request( app.getHttpServer() ).get( `${raiz}/linha/${linha}/horarios` );
    } );

    then( "retornará os horários cadastrados daquela linha", () => {
      horarios = JSON.parse( JSON.stringify( resposta.body ) );
      expect( horarios.length ).toBeGreaterThan( 0 );
    } );
  } );



  test( "Não existem horários de linhas registradas", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações dos horarios de uma linha", () => {
      linha = 0; //propositalmente errado para forçar um cenario de erro
    } );

    given( "Não há informações cadastradas", async () => {
      resposta = await request( app.getHttpServer() ).get( `${raiz}/linha/${linha}/horarios` );
      expect( resposta.status ).toBe( 404 );
    } );

    when( "eu pesquisar uma linha", async () => {
      //pesquisa ja feita acima
    } );

    then( "recebo uma mensagem informando que não há informações disponíveis", () => {
      expect( resposta.body.mensagem ).toBe( "Horarios não encontrados" );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
