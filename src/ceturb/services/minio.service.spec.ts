import { Test, TestingModule } from '@nestjs/testing';
import { MinioService } from './minio.service';
jest.mock( './minio.service' );

describe( 'HorarioService', () => {
  let service: MinioService;
  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ MinioService ],
    } ).compile();
    service = module.get<MinioService>( MinioService );
  } );


  it( '', async () => {
    let minio = await service.config();
    expect( minio ).toBe( 'Added `minio` successfully.' )
  } );


  it( 'O retorno do endereço do minio deve estar correto', async () => {
    let address = '';
    address = await service.getAddress();
    expect( address ).toBe( 'http://172.17.0.1:9000' )
  } );

} );
