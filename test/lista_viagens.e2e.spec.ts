import { defineFeature, loadFeature } from "jest-cucumber";
import { Test, TestingModule } from "@nestjs/testing";
import request from "supertest";
import { INestApplication } from "@nestjs/common";
import { AppModule } from "../src/app.module";
import { ViagensService } from '../src/ceturb/services/viagens.service';
import { Endpoints } from '../src/commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;
const feature = loadFeature( "./test/features/buscaViagens.feature" );
jest.mock( '../src/ceturb/services/viagens.service' );

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




let viagens = [];
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

    test( "Existem viagens registradas", ( { given, when, then } ) => {


        given( "Eu quero saber as informações das viagens cadastradas", async () => {

            ViagensService.prototype.retornar_viagens = jest.fn().mockImplementationOnce( () => {
                let obj1 = { "dataAgendada": 1534170720000, "linhaId": 428, "itinerarioId": 692, "dataChegadaEstimada": 1534172461000, "veiculo": "14133", "acessibilidade": true }
                let obj2 = { "dataAgendada": 1534170720000, "linhaId": 457, "itinerarioId": 600, "dataChegadaEstimada": 1534172492000, "veiculo": "14217", "acessibilidade": true }
                let obj3 = { "dataAgendada": 1534170720000, "linhaId": 457, "itinerarioId": 601, "dataChegadaEstimada": 1534172495000, "veiculo": "14087", "acessibilidade": true }
                return [ obj1, obj2, obj3 ];
            } );
            resposta = await request( app.getHttpServer() ).get( `${raiz}/viagens` );
        } );



        when( "eu pesquisar viagens", async () => {
            viagens = JSON.parse( JSON.stringify( resposta.body ) );
        } );



        then( "retorna as viagens cadastradas", () => {
            expect( viagens.length ).toBeGreaterThan( 0 );
        } );
    } );

    afterAll( async () => {
        await app.close();
    } );

} );
