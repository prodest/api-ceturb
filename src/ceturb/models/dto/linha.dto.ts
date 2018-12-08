import { ApiModelProperty } from "@nestjs/swagger";

export class LinhaDto {
    @ApiModelProperty()
    id: number;

    @ApiModelProperty()
    codigo: string;

    @ApiModelProperty()
    descricao: string;
}
