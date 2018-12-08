import { ApiModelProperty } from "@nestjs/swagger";

export class ViagemDto {

    @ApiModelProperty()
    dataAgendada: number;

    @ApiModelProperty()
    linhaId: number;

    @ApiModelProperty()
    itinerarioId: number;

    @ApiModelProperty()
    dataChegadaEstimada: number;

    @ApiModelProperty()
    veiculo: string;

    @ApiModelProperty()
    acessibilidade: boolean
}
