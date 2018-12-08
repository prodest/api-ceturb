import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ponto } from './Ponto.model';
import { Viagem } from './Viagem.model';
import { Auditoria } from './Auditoria.model';


@Entity()
export class Estimativa extends Auditoria {

    @Column( "date" )
    datadecoleta: string;

    @Column( 'time' )
    horarionoponto: 'string';

    @Column( 'bit' )
    pontofinal: boolean;


    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################


    //varias estimativas são de um ponto
    @ManyToOne( type => Ponto, { nullable: false } )
    @JoinColumn( { name: "ponto_id" } )
    ponto_id: number;


    //varias estimativas são de uma viagem
    @ManyToOne( type => Viagem, { nullable: false } )
    @JoinColumn( { name: "viagem_id" } )
    viagem_id: number;

}
