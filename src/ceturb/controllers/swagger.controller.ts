import { Controller, Get, Res, HttpStatus } from '@nestjs/common';
import { SwaggerService } from '../../ceturb/services/swagger.service';
import { ApiOperation, ApiResponse, ApiUseTags } from '@nestjs/swagger';
import { json } from 'body-parser';
import { Endpoints } from '../../commom/configs/endpoints.config';
const raiz: string = new Endpoints().rotaRaiz;

@Controller( `${raiz}/swagger` )
@ApiUseTags( "swagger.json" )
export class SwaggerController {
    constructor( private readonly Service: SwaggerService ) { }

    @Get()
    @ApiOperation( {
        description: "Retorna o arquivo swagger.json para auxiliar na criação de clients pela comunidade",
        title: "swagger.json"
    } )

    @ApiResponse( {
        status: 200,
        description: "OK",
        type: json
    } )
    async getSwagger ( @Res() res ) {
        const doc = await this.Service.getJson();
        res
            .status( HttpStatus.OK )
            .send( doc );
    }
}
