import { Test, TestingModule } from '@nestjs/testing';
import { ItinerarioService } from './itinerario.service';
jest.mock( './itinerario.service' );

describe( 'ItinerarioService', () => {
  let service: ItinerarioService;


  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ ItinerarioService ],
    } ).compile();
    service = module.get<ItinerarioService>( ItinerarioService );
  } );

  /*
    it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
      async () => {
        let retorno = await service.getItinerarios();
        expect( retorno.length ).toBeGreaterThan( 0 );
      } );
  */

  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getItinerariosByCodigo( '123' );
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getViagemByItinerarioCode( '123' );
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

  it( 'getShapesPorItinerario() deve retornar um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getShapesPorItinerario( '123' );
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

} );
