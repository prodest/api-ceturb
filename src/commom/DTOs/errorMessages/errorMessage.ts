/*
Classe para envio de mensagens de erro padronizadas
*/
import { ApiModelProperty } from "@nestjs/swagger";



export class ErrorMessage {
    constructor( message: string, endpoint: string, status: number ) {
        this.mensagem = message;
        this.data = new Date();
        this.rota = endpoint;
        this.statusCode = status;
    }


    @ApiModelProperty()
    readonly mensagem: string;

    @ApiModelProperty()
    readonly data: Date;

    @ApiModelProperty()
    readonly rota: string

    @ApiModelProperty()
    readonly statusCode: number;

}
