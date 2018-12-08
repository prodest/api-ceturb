import { Entity, Column, Double, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { Agencia } from './Agencia.model';
import { Auditoria } from './Auditoria.model';
import { LinhaTarifaVigencia } from './LinhaTarifaVigencia.model';
import { ApiModelProperty } from '@nestjs/swagger';


@Entity()
export class Tarifa extends Auditoria {
    @Column( "float" )
    @ApiModelProperty()
    preco: Double;

    @Column( "date" )
    @ApiModelProperty()
    dataupload: Date;


    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################


    //varias tarifas são aplicáveis a varias agencias
    @ManyToOne( type => Agencia, { nullable: false } )
    @JoinColumn( { name: "agencia_id" } )
    @ApiModelProperty()
    agencia_id: number;


    @OneToMany( type => LinhaTarifaVigencia, linhatarifavigencias => LinhaTarifaVigencia )
    linhatarifavigencias: LinhaTarifaVigencia[];

}
