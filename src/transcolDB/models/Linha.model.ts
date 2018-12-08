import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Itinerario } from './Itinerario.model';
import { Agencia } from './Agencia.model';
import { Auditoria } from './Auditoria.model';


@Entity()
export class Linha extends Auditoria {
    @Column()
    id_geocontrol: number;

    @Column()
    codigo: string;

    @Column()
    descricao: string;

    @Column( "bit" )
    status: boolean;

    @Column( "bit", { default: 0 } )
    diautil: boolean;

    @Column( "bit", { default: 0 } )
    sabado: boolean;

    @Column( "bit", { default: 0 } )
    domingo: boolean;

    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################

    //varias linhas pertencem a uma agencia
    @ManyToOne( type => Agencia, { nullable: false } )
    @JoinColumn( { name: "agencia_id" } )
    agencia_id: number;

    //uma linha possui vários itinerários
    @OneToMany( type => Itinerario, itinerarios => Itinerario )
    itinerarios: Itinerario[];

}
