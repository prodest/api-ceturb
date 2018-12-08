import { Test, TestingModule } from '@nestjs/testing';
import { GtfsService } from './gtfs.service';
jest.mock( './gtfs.service' );

describe( 'HorarioService', () => {
  let service: GtfsService;
  beforeAll( async () => {
    const module: TestingModule = await Test.createTestingModule( {
      providers: [ GtfsService ],
    } ).compile();
    service = module.get<GtfsService>( GtfsService );
  } );

  it( 'O retorno de arquivos GTFS deve ser maior do que 0', async () => {
    GtfsService.prototype.getAll = jest
      .fn()
      .mockImplementationOnce( () => {
        let obj1 = {
            "year": '2018',
            "month": '09',
            "day": '10',
            "hour": "08:35:11",
            "size": "426B",
            "filename": "README.md",
            "url": "http://127.0.0.1:9000/gtfs/README.md"
        }

        let obj2 = {
            "year": '2017',
            "month": '11',
            "day": '05',
            "hour": "10:12:11",
            "size": "826B",
            "filename": "tslint.json",
            "url": "http://127.0.0.1:9000/gtfs/tslint.json"
        }

        let obj3 = {
            "year": '2016',
            "month": '12',
            "day": '22',
            "hour": "12:05:11",
            "size": "4.55KiB",
            "filename": "zip.zip",
            "url": "http://127.0.0.1:9000/gtfs/zip.zip"
        }
        
        return [ obj1, obj2, obj3 ];
      } );
    let gtfs = [];
    gtfs = await service.getAll();
    expect( gtfs.length ).toBeGreaterThan( 0 );
  } );

  it( 'O retorno de arquivos GTFS deve ser maior do que 0 passando ano', async () => {
    GtfsService.prototype.getByYear = jest
      .fn()
      .mockImplementationOnce( () => {
        let data = [ { "teste": "teste" }, { "teste": "teste" }, { "teste": "teste" } ];
        return data;
      } );

    let gtfs = [];
    let year = "2018";
    gtfs = await service.getByYear( year );
    expect( gtfs.length ).toBeGreaterThan( 0 );
  } );

  it( 'O retorno de arquivos GTFS deve ser maior do que 0 passando ano e mês', async () => {
    GtfsService.prototype.getByYear = jest
      .fn()
      .mockImplementationOnce( () => {
        let data = [ { "teste": "teste" }, { "teste": "teste" }, { "teste": "teste" } ];
        return data;
      } );

    let gtfs = [];
    let year = "2018";
    let month = "09";
    gtfs = await service.getByYearMonth( year, month );
    expect( gtfs.length ).toBeGreaterThan( 0 );
  } );

  it( 'O retorno de arquivos GTFS deve ser maior do que 0 passando ano, mês, dia', async () => {
    GtfsService.prototype.getByYear = jest
      .fn()
      .mockImplementationOnce( () => {
        let data = [ { "teste": "teste" }, { "teste": "teste" }, { "teste": "teste" } ];
        return data;
      } );

    let gtfs = [];
    let year = "2018";
    let month = "09";
    let day = "10";
    gtfs = await service.getByYearMonthDay( year, month, day );
    expect( gtfs.length ).toBeGreaterThan( 0 );
  } );
} );
