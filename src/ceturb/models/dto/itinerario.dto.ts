import { ApiModelProperty } from "@nestjs/swagger";

export class itinerarioDto {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    codigo: string;

    @ApiModelProperty()
    bandeira: string;

    @ApiModelProperty()
    linhaId: number;
}