import { ApiModelProperty } from "@nestjs/swagger";

export class Gtfs {

    @ApiModelProperty()
    year: string;

    @ApiModelProperty()
    month: string;

    @ApiModelProperty()
    day: string;

    @ApiModelProperty()
    hour: string;

    @ApiModelProperty()
    size: string;

    @ApiModelProperty()
    filename: string;

    @ApiModelProperty()
    url: string;
}
