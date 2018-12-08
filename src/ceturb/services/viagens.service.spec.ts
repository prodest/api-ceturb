import { Test, TestingModule } from '@nestjs/testing';
import { ViagensService } from './viagens.service';
jest.mock( "./viagens.service" );


describe( 'ViagensService', () => {
  let service: ViagensService;

  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ ViagensService ],
    } ).compile();
    service = module.get<ViagensService>( ViagensService );
  } );

  it( 'retorno de viagens deve ser maior do que 0', async () => {
    ViagensService.prototype.retornar_viagens = jest
      .fn()
      .mockImplementationOnce( () => {
        let obj1 = { "dataAgendada": 1534170720000, "linhaId": 428, "itinerarioId": 692, "dataChegadaEstimada": 1534172461000, "veiculo": "14133", "acessibilidade": true }

        let obj2 = { "dataAgendada": 1534170720000, "linhaId": 457, "itinerarioId": 600, "dataChegadaEstimada": 1534172492000, "veiculo": "14217", "acessibilidade": true }

        let obj3 = { "dataAgendada": 1534170720000, "linhaId": 457, "itinerarioId": 601, "dataChegadaEstimada": 1534172495000, "veiculo": "14087", "acessibilidade": true }

        return [ obj1, obj2, obj3 ];
      } );
    let viagens = [];
    viagens = await service.retornar_viagens();
    expect( viagens.length ).toBeGreaterThan( 0 );
  } );


  /*
      it( 'retorno de viagens para os próximos 7 dias deve ser maior do que 0', async () => {
        ViagensService.prototype.retornar_viagens_7dias = jest
          .fn()
          .mockImplementationOnce( () => {
            let obj1 = { "dataAgendada": 1534170720000, "linhaId": 428, "itinerarioId": 692, "dataChegadaEstimada": 1534172461000, "veiculo": "14133", "acessibilidade": true }
            let obj2 = { "dataAgendada": 1534170720000, "linhaId": 457, "itinerarioId": 600, "dataChegadaEstimada": 1534172492000, "veiculo": "14217", "acessibilidade": true }
            let obj3 = { "dataAgendada": 1534170720000, "linhaId": 457, "itinerarioId": 601, "dataChegadaEstimada": 1534172495000, "veiculo": "14087", "acessibilidade": true }
            return [ obj1, obj2, obj3 ];
          } );
        let viagens = [];
        viagens = await service.retornar_viagens_7dias();
        expect( viagens.length ).toBeGreaterThan( 0 );
      } );
  */

} );

