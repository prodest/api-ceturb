import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { ViagensService } from '../services/viagens.service';
import { Endpoints } from '../../commom/configs/endpoints.config';
import { ViagemDto } from '../../ceturb/models/dto/viagem.dto';
import { ErrorMessage } from '../../commom/DTOs/errorMessages/errorMessage';
const raiz: string = new Endpoints().rotaRaiz;
const path: string = `${raiz}/viagens`;


@Controller( `${raiz}/viagens` )
@ApiUseTags( "Viagens" )
export class ViagensController {
    constructor( private readonly service: ViagensService ) { }

    @Get()
    @ApiOperation( {
        title: 'Listar viagens',
        description: "lista todas as viagens ativas. \nOrigem: Geocontrol"
    } )
    @ApiResponse( {
        status: 200,
        description: 'Viagens encontradas',
        type: ViagemDto,
        isArray: true
    } )
    public async lista_viagens ( @Res() res ) {
        try {
            res
                .status( HttpStatus.OK )
                .send( await this.service.retornar_viagens() );

        } catch ( err ) {
            let msg: string = err.message;
            let rota: string = path;
            let status: number = HttpStatus.BAD_GATEWAY;
            let resposta = new ErrorMessage( msg, rota, status );
            res
                .status( HttpStatus.BAD_GATEWAY )
                .send( resposta );
        }
    }



    /*
        @Get( '7dias' )
        //rota existe na geocontrol mas não funciona
        public async lista_viagens_7dias ( @Res() res ) {
            try {
                res
                    .status( HttpStatus.OK )
                    .send( await this.service.retornar_viagens_7dias() );
            } catch ( err ) {
                res
                    .status( HttpStatus.NO_CONTENT )
                    .send( new InformationNotFound( "Não há registros" ) );
            }
        }
    */
}
