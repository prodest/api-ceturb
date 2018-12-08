import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AgenciaService } from '../src/transcolDB/services/agencia.service'
import { AppModule } from '../src/app.module';
const feature = loadFeature( "./test/features/db.agencia.feature" );
jest.mock( '../src/transcolDB/services/agencia.service' );
import { Endpoints } from '../src/commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;

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

  test( "Agencias encontradas", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de agencias", async () => {
      endpoint = `${raiz}/agencias`;
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
    } );

    then( "recebo uma lista de agencias", () => {
      expect( resposta.status ).toBe( 302 );
    } );
  } );


  test( "Agencias não encontradas", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de agencias", async () => {
      endpoint = `${raiz}/agencias`;
    } );

    given( "O banco de dados está vazio", async () => {
      //simula um banco vazio
      AgenciaService.prototype.getAgencias = jest.fn().mockImplementationOnce( () => {
        return [];
      } );
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
      expect( resposta.status ).toBe( 404 );
    } );

    then( "recebo uma mensagem de erro", () => {
      expect( resposta.body.mensagem ).toBe( "Nenhuma agencia encontrada na busca" );
    } );
  } );

  test( "Erro na busca", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de agencias", async () => {
      endpoint = `${raiz}/agencias`;
    } );

    given( "algum problema lógico ou de infra ocorreu", async () => {
      //simula o banco offline
      AgenciaService.prototype.getAgencias = jest.fn().mockImplementationOnce( () => {
        throw new Error( `Erro ao buscar agencias\nO Banco está conectado e acessível ?` );
      } );
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
      expect( resposta.status ).toBe( 502 );
    } );

    then( "recebo uma mensagem de erro", () => {
      expect( resposta.body.mensagem ).toBe( `Erro ao buscar agencias\nO Banco está conectado e acessível ?` );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
