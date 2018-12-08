import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { Endpoints } from '../src/commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;
const feature = loadFeature( "./test/features/buscaHorarioObs.feature" );
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

defineFeature( feature, test => {
  let module: TestingModule;
  let app: INestApplication;
  let linha;
  let resposta: any;

  beforeAll( async () => {
    module = await Test.createTestingModule( {
      imports: [ AppModule ]
    } ).compile();
    app = module.createNestApplication();
    await app.init();
  } );


  test( "Existem observações de horários de uma linha", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações adicionais sobre horarios de uma linha", () => {
      request( app.getHttpServer() )
        .get( `${raiz}/horarios/obs/500` )
        .expect( 200 );
    } );

    when( "eu pesquisar as observações do horário da linha", async () => {
      linha = 500;
      let requisicao = await request( app.getHttpServer() ).get( `${raiz}/linha/${linha}/horarios/obs` );
      horarios = JSON.parse( JSON.stringify( requisicao.body ) );
    } );

    then( "retornará as observações do horário cadastradas daquela linha", () => {
      expect( horarios.length ).toBeGreaterThan( 0 );
    } );
  } );


  test( "Não existem observações de horários de uma linha", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações adicionais sobre horarios de uma linha", () => {
      linha = 0; //propositalmente errado para forçar o cenario de erro
    } );

    when( "eu pesquisar as observações do horário da linha", async () => {
      resposta = await request( app.getHttpServer() ).get( `${raiz}/linha/${linha}/horarios/obs` );
    } );

    then( "retornará uma mensagem informando que não há registros", async () => {
      expect( resposta.body.mensagem ).toBe( "Observações não encontradas" );

    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
