import { ApiModelProperty } from "@nestjs/swagger";

export class estimativasDto {
    @ApiModelProperty()
    veiculo: string;

    @ApiModelProperty()
    acessibilidade: boolean;

    @ApiModelProperty()
    itinerarioId: number;

    @ApiModelProperty()
    horarioDePartida: number;

    @ApiModelProperty()
    horarioNaOrigem: number;

    @ApiModelProperty()
    horarioDaTransmissao: number;

    @ApiModelProperty()
    pontoFinal: boolean;

    @ApiModelProperty()
    busStopPosition: number;

    @ApiModelProperty()
    busStopFinalPosition: number;

    @ApiModelProperty()
    horarioNoDestino: number;
}
