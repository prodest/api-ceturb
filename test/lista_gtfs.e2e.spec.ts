import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { GtfsService } from "../src/ceturb/services/gtfs.service";
import { Endpoints } from '../src/commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;
const feature = loadFeature( "./test/features/buscaGtfs.feature" );

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
let gtfs = [];
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

  test( "Existem arquivos GTFS registrados", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero saber as informações dos arquivos GTFS criados", async () => {
      endpoint = `${raiz}/gtfs`;
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
    } );

    then( "recebo as informações", () => {
      gtfs = JSON.parse( JSON.stringify( resposta.body ) );
      expect( gtfs.length ).toBeGreaterThan( 0 );
    } );
  } );

  test( "Não existem arquivos GTFS registrados", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as informações dos arquivos GTFS criados", () => {
      endpoint = `${raiz}/gtfs`;
    } );

    given( "Não há informações sobre esses arquivos", async () => {
      GtfsService.prototype.getAll = jest.fn().mockImplementationOnce( () => {
        return [];
      } );
      resposta = await request( app.getHttpServer() ).get( endpoint );
      expect( resposta.status ).toBe( 404 );
    } );

    when( "eu pesquisar", async () => {
      //pesquisa ja feita acima
    } );

    then( "recebo uma mensagem informando que não há arquivos", () => {
      expect( resposta.body.mensagem ).toBe( 'Não há arquivos registrados' );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
