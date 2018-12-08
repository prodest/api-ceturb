/*Entidade de auditoria para extender os outros modelos e auditar dados - pedido do Paulo */
import { BaseEntity, PrimaryGeneratedColumn, CreateDateColumn, UpdateDateColumn } from "typeorm";
import { ApiModelProperty } from "@nestjs/swagger";

export class Auditoria extends BaseEntity {
    @PrimaryGeneratedColumn()
    @ApiModelProperty()
    id: number;

    @CreateDateColumn()
    @ApiModelProperty()
    dataregistro: Date;

    @UpdateDateColumn()
    @ApiModelProperty()
    atualizadoem: Date;

}
