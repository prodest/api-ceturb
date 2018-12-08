import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { Endpoints } from '../src/commom/configs/endpoints.config';
import { json } from "express";
const raiz: string = new Endpoints().rotaRaiz;
const feature = loadFeature( "./test/features/buscaSwagger.feature" );

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
  let requisicao;

  beforeAll( async () => {
    module = await Test.createTestingModule( {
      imports: [ AppModule ]
    } ).compile();
    app = module.createNestApplication();
    await app.init();
  } );


  test( "Arquivo encontrado", ( {
    given,
    when,
    then
  } ) => {

    given( "Eu quero acessar o swagger.json", () => {
      request( app.getHttpServer() )
        .get( `${raiz}/swagger` )
        .expect( 200 );
    } );

    when( "eu buscar", async () => {
      requisicao = await request( app.getHttpServer() ).get( `${raiz}/swagger` );
    } );

    then( "recebo o swagger.json", () => {
      expect( requisicao.status ).toBe( 200 );
    } );
  } );




  afterAll( async () => {
    await app.close();
  } );

} );
