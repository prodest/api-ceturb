import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Agencia } from './Agencia.model';
import { Auditoria } from './Auditoria.model';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity()
export class Feriado extends Auditoria {

    @Column()
    @ApiModelProperty()
    nome: string;

    @Column( "date" )
    @ApiModelProperty()
    data: Date;

    @Column( "date" )
    @ApiModelProperty()
    dataupload: Date;



    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################


    //varios Feriados se aplicam a uma agencia
    @ManyToOne( type => Agencia, { nullable: false } )
    @JoinColumn( { name: "agencia_id" } )
    @ApiModelProperty()
    agencia_id: number;
}
