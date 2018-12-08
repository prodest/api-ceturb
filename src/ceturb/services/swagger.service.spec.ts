import { Test, TestingModule } from '@nestjs/testing';
import { SwaggerService } from './swagger.service';

let doc;

describe( 'SwaggerService', () => {
  let service: SwaggerService;;

  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ SwaggerService ],
    } ).compile();
    service = module.get<SwaggerService>( SwaggerService );
  } );

  it( 'getJson() deve retornar um swagger.json da api-ceturb', async () => {
    doc = JSON.parse( await service.getJson() );
    expect( doc.swagger ).toBe( '2.0' );
    expect( doc.info.description ).toBe( 'API de acesso aos dados do transporte público do estado do Espírito Santo' );
  } );

} );
