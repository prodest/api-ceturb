import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Itinerario } from './Itinerario.model';
import { Auditoria } from './Auditoria.model';
import { ApiModelProperty } from '@nestjs/swagger';

@Entity( { name: "pontogeografico" } )
export class PontoGeografico extends Auditoria {
    @Column()
    @ApiModelProperty()
    latitude: string;

    @Column()
    @ApiModelProperty()
    longitude: string;

    @Column( { nullable: true } )
    @ApiModelProperty()
    altitude: string;

    @Column( "int" )
    @ApiModelProperty()
    sequencia: number;

    @Column( "date" )
    @ApiModelProperty()
    dataupload: Date;


    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################


    //varios 'Vértices' deste modelo formam o shape de cada itinerário
    @ManyToOne( type => Itinerario, { nullable: false } )
    @JoinColumn( { name: "itinerario_id" } )
    @ApiModelProperty()
    itinerario_id: number;
}
