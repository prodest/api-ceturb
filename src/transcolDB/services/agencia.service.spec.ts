import { Test, TestingModule } from '@nestjs/testing';
import { AgenciaService } from './agencia.service';
jest.mock( './agencia.service' );

describe( 'AgenciaService', () => {
  let service: AgenciaService;
  let resposta;


  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ AgenciaService ],
    } ).compile();
    service = module.get<AgenciaService>( AgenciaService );
  } );


  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getAgencias();
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getContatos();
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getFeriados();
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

  it( 'Espera-se que o serviço devolva um array como resposta, que seja maior que 0',
    async () => {
      let retorno = await service.getTarifas();
      expect( retorno.length ).toBeGreaterThan( 0 );
    } );

  //DESATIVADOS NA VERSÃO 1.11.9
  // it( 'O retorno ao consultar uma data que é feriado deve ser true', async () => {
  //   let natal: Date = new Date( '2018/12/25' );
  //   resposta = await service.CheckFeriado( natal.toLocaleDateString() );
  //   expect( resposta.feriado ).toBe( true );
  // } );


  // it( 'O retorno ao consultar uma data que NÃO é feriado deve ser false', async () => {
  //   let diachato: Date = new Date( '2018/10/04' )
  //   resposta = await service.CheckFeriado( diachato.toLocaleDateString() )
  //   expect( resposta.feriado ).toBe( false );
  // } );

} );
