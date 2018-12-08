import { ApiModelProperty } from '@nestjs/swagger';

export class Agencia {
    @ApiModelProperty()
    agency_id: number = 1;

    @ApiModelProperty()
    agency_name: string = "CETURB/ES";

    @ApiModelProperty()
    agency_timezone: string = "America/Sao_Paulo";

    @ApiModelProperty()
    agency_url: string = "https://ceturb.es.gov.br/";

    @ApiModelProperty()
    agency_lang: string = "pt"

    @ApiModelProperty()
    agency_phone: string = "0800 039 1517";
}
