import { Test, TestingModule } from '@nestjs/testing';
import { EstimativasService } from './estimativas.service';
jest.mock( './estimativas.service' );

class parametroOrigemEDestino {
  id_origem: number;
  id_destino: number;
}

class parametroOrigemELinha {
  id_origem: number;
  id_linha: number;
}

describe( 'EstimativasService', () => {
  let service: EstimativasService;
  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ EstimativasService ],
    } ).compile();
    service = module.get<EstimativasService>( EstimativasService );
  } );

  it( 'O retorno de estimativas por origem deve ser maior que 0', async () => {
    let consulta = await service.ObterPorOrigem( 1 );
    expect( consulta.estimativas.length ).toBeGreaterThan( 0 );
  } );


  it( 'O retorno de estimativas por origem e destino devem ser maior que 0', async () => {
    var param = new parametroOrigemEDestino();
    param.id_destino = 1;
    param.id_origem = 1;
    let consulta = await service.ObterPorOrigemEDestino( param );
    expect( consulta.estimativas.length ).toBeGreaterThan( 0 );
  } );


  it( 'O retorno de estimativas por origem e Linha devem ser maior que 0', async () => {
    var param = new parametroOrigemELinha();
    param.id_linha = 1;
    param.id_origem = 1;
    let consulta = await service.ObterPorOrigemELinha( param );
    expect( consulta.estimativas.length ).toBeGreaterThan( 0 );
  } );

} );
