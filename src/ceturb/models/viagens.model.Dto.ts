import { ApiModelProperty } from "@nestjs/swagger";

export class Viagens {

    @ApiModelProperty()
    dataAgendada: string;

    @ApiModelProperty()
    linhaId: number;

    @ApiModelProperty()
    itinerarioId: number;

    @ApiModelProperty()
    veiculo: number;

    @ApiModelProperty()
    acessibilidade: boolean;
}
