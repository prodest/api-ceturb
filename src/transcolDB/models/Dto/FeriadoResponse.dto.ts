import { ApiModelProperty } from "@nestjs/swagger";

//Objeto de resposta para a funcionalidade de verificar se um dia é feriado

export class FeriadoResponse {
    @ApiModelProperty()
    data: string;

    @ApiModelProperty()
    feriado: boolean;
}
