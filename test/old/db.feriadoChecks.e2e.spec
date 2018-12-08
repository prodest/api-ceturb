//DESATIVADO NA VERSÃO 1.11.9

// import { defineFeature, loadFeature } from "jest-cucumber";
// import { Test, TestingModule } from "@nestjs/testing";
// import request from "supertest";
// import { INestApplication } from "@nestjs/common";
// import { AppModule } from '../src/app.module';
// const feature = loadFeature( "./test/features/db.feriadoChecks.feature" );
// jest.mock( '../src/transcolDB/services/agencia.service' );
// import { Endpoints } from '../src/commom/configs/endpoints.config';
// const raiz: string = new Endpoints().rotaRaiz;

// //--------------------------------------------------------------------//
// //---------------------mocks GLOBAIS obrigatórios --------------------//
// //--------------------------------------------------------------------//
// jest.mock( '../src/ceturb/ceturb.module' );
// jest.mock( "../src/transcolDB/transcolDB.module" );
// jest.mock( '../src/app.module' );
// jest.mock( '../src/ceturb/services/gtfs.service' );
// jest.mock( '../src/ceturb/services/minio.service' );
// //--------------------------------------------------------------------//
// //---------------------mocks GLOBAIS obrigatórios --------------------//
// //--------------------------------------------------------------------//



// let resposta: any;
// let endpoint: string;
// let dia: string;
// let mes: string;
// let ano: string;

// defineFeature( feature, test => {
//   let module: TestingModule;
//   let app: INestApplication;

//   beforeAll( async () => {
//     module = await Test.createTestingModule( {
//       imports: [ AppModule ]
//     } ).compile();
//     app = module.createNestApplication();
//     await app.init();
//   } );

//   test( "A data pesquisada É um feriado", ( {
//     given,
//     when,
//     then
//   } ) => {
//     given( "quero saber se uma data está registrada como um feriado", async () => {
//       endpoint = `${raiz}/agencias/feriados/validar/${ano}/${mes}/${dia}`;
//     } );

//     given( "a data que informei é um feriado", async () => {
//       dia = '25';
//       mes = '12';
//       ano = '2018';
//       endpoint = `${raiz}/agencias/feriados/validar/${ano}/${mes}/${dia}`;
//     } );

//     when( "eu pesquisar", async () => {
//       resposta = await request( app.getHttpServer() ).get( endpoint );
//     } );

//     then( "recebo a informação desejada", () => {
//       expect( resposta.status ).toBe( 200 );
//       expect( resposta.body.feriado ).toBe( true );
//     } );
//   } );


//   test( "A data pesquisada NÃO é um feriado", ( {
//     given,
//     when,
//     then
//   } ) => {
//     given( "quero saber se uma data está registrada como um feriado", async () => {
//       endpoint = `${raiz}/agencias/feriados/validar/${ano}/${mes}/${dia}`;
//     } );

//     given( "a data que informei não é um feriado", async () => {
//       dia = '04';
//       mes = '10';
//       ano = '2018';
//       endpoint = `${raiz}/agencias/feriados/validar/${ano}/${mes}/${dia}`;
//     } );

//     when( "eu pesquisar", async () => {
//       resposta = await request( app.getHttpServer() ).get( endpoint );
//     } );

//     then( "recebo a informação desejada", () => {
//       expect( resposta.status ).toBe( 200 );
//       expect( resposta.body.feriado ).toBe( false );
//     } );
//   } );



//   afterAll( async () => {
//     await app.close();
//   } );

// } );
