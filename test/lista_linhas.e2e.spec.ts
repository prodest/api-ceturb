import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { LinhasService } from '../src/ceturb/services/linhas.service';
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { InformationNotFound } from "../src/ceturb/models/exception/InformationNotFound";
import { Endpoints } from '../src/commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;
const feature = loadFeature( "./test/features/buscaLinhas.feature" );
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




let linhas = [];
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

  test( "Existem linhas registradas", ( {
    given,
    when,
    then
  } ) => {
    given( "Eu quero saber as informações das linhas registrados", async () => {
      resposta = await request( app.getHttpServer() ).get( `${raiz}/linha` );
    } );

    when( "eu pesquisar", async () => {
      //busca ja feita acima
    } );

    then( "retorna as linhas cadastradas", () => {
      linhas = JSON.parse( JSON.stringify( resposta.body ) );
      expect( linhas.length ).toBeGreaterThan( 0 );
    } );
  } );



  afterAll( async () => {
    await app.close();
  } );

} );
