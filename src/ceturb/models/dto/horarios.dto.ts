import { ApiModelProperty } from "@nestjs/swagger";

export class HorarioDto {
    @ApiModelProperty()
    Linha: string;

    @ApiModelProperty()
    Hora_Saida: string;

    @ApiModelProperty()
    Terminal_Seq: number;

    @ApiModelProperty()
    TP_Horario: number;

    @ApiModelProperty()
    Descricao_Hora: string;

    @ApiModelProperty()
    Descricao_Linha: string;

    @ApiModelProperty()
    Desc_Terminal: string;

    @ApiModelProperty()
    Tipo_Orientacao: string;

    @ApiModelProperty()
    Dt_Inicio: string;
}
