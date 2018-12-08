import { Test, TestingModule } from '@nestjs/testing';
import { PontoService } from './ponto.service';
jest.mock( './ponto.service' );

describe( 'PontoService', () => {
  let service: PontoService;


  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ PontoService ],
    } ).compile();
    service = module.get<PontoService>( PontoService );
  } );


  it( 'getItinerariosPorPonto() deve retornar um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getItinerariosPorPonto( '123' );
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );


} );
