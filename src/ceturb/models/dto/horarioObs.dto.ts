import { ApiModelProperty } from "@nestjs/swagger";

export class HorarioObsDto {
    @ApiModelProperty()
    Tipo_Orientacao: string;

    @ApiModelProperty()
    Descricao_Orientacao: string;
}
