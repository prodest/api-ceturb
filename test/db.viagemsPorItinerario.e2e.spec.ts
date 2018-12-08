import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { ItinerarioService } from '../src/transcolDB/services/itinerario.service';
import { AppModule } from '../src/app.module';
import { Endpoints } from '../src/commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;
const feature = loadFeature( "./test/features/db.viagemsPorItinerario.feature" );
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
let endpoint: string;
let codigo_itinerario: string

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

  test( "Viagems encontradas", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de viagems de um itinerário específico", async () => {
      codigo_itinerario = '12345'
      endpoint = `${raiz}/itinerarios/${codigo_itinerario}/viagens`;
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
    } );

    then( "recebo uma lista de viagems daquele itinerário", () => {
      expect( resposta.status ).toBe( 302 );
    } );
  } );


  test( "Viagems não encontradas", ( {
    given,
    when,
    then
  } ) => {
    given( "quero ver a lista de viagems de um itinerário específico", async () => {
      codigo_itinerario = '000000000000000'
      endpoint = `${raiz}/itinerarios/${codigo_itinerario}/viagens`;
    } );

    given( "Não há registros disponíveis", async () => {
      //simula um banco vazio
      ItinerarioService.prototype.getViagemByItinerarioCode = jest.fn().mockImplementationOnce( ( cod: string ) => {
        return [];
      } );
    } );

    when( "eu pesquisar", async () => {
      resposta = await request( app.getHttpServer() ).get( endpoint );
      expect( resposta.status ).toBe( 404 );
    } );

    then( "recebo uma mensagem de erro", () => {
      expect( resposta.body.mensagem ).toBe( "Nenhuma viagem encontrada na busca" );
    } );
  } );


  afterAll( async () => {
    await app.close();
  } );

} );
