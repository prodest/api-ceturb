/* Entidade em substituição a tabela itemediária. Pedido do Gary */
import { Entity, Column, ManyToOne, JoinColumn } from 'typeorm';
import { Ponto } from './Ponto.model';
import { Itinerario } from './Itinerario.model';
import { Auditoria } from './Auditoria.model';

@Entity( { name: "itinerario_ponto" } )
export class ItinerarioPonto extends Auditoria {

    @Column( "bit" )
    embarque: boolean;

    @Column( "bit" )
    desembarque: boolean;

    @Column( "int" )
    ordem: number;

    @ManyToOne( type => Ponto, { nullable: false } )
    @JoinColumn( { name: "ponto_id" } )
    ponto_id: number;


    @ManyToOne( type => Itinerario, { nullable: false } )
    @JoinColumn( { name: "itinerario_id" } )
    itinerario_id: number;
}
