import { ApiModelProperty } from '@nestjs/swagger';

export class Itinerario {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    codigo: number;

    @ApiModelProperty()
    bandeira: string;

    @ApiModelProperty()
    linhaId: number;
}
