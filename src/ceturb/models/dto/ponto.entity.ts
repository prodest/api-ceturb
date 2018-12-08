import { ApiModelProperty } from '@nestjs/swagger';
export class Ponto {
  @ApiModelProperty() readonly id: number;
  @ApiModelProperty()readonly codigo: string;
  @ApiModelProperty()readonly municipio: string;
  @ApiModelProperty()readonly logradouro: string;
  @ApiModelProperty()readonly referencia: string;
  @ApiModelProperty()readonly latitude: number;
  @ApiModelProperty()readonly longitude: number;
  @ApiModelProperty()readonly azimute: number;
  @ApiModelProperty()readonly terminal: boolean;

  constructor(
    id: number,
    codigo: string,
    municipio: string,
    logradouro: string,
    referencia: string,
    latitude: number,
    longitude: number,
    azimute: number,
    terminal: boolean
  ) {
    this.id = id;
    this.codigo = codigo;
    this.municipio = municipio;
    this.logradouro = logradouro;
    this.referencia = referencia;
    this.latitude = latitude;
    this.longitude = longitude;
    this.azimute = azimute;
    this.terminal = terminal;
  }
}
