import { ApiModelProperty } from '@nestjs/swagger';

export class Linha {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    codigo: number;

    @ApiModelProperty()
    descricao: string;
}
