import { Entity, Column, OneToMany } from 'typeorm';
import { Estimativa } from './Estimativa.model';
import { ItinerarioPonto } from './itinerario_ponto.model';
import { Auditoria } from './Auditoria.model';



@Entity()
export class Ponto extends Auditoria {
    @Column( { nullable: true } )
    id_geocontrol: number;

    @Column( "bit" )
    terminal: boolean;

    @Column()
    codigo: string;

    @Column()
    municipio: string;

    @Column( { nullable: true } )
    logradouro: string;

    @Column()
    latitude: string;

    @Column()
    longitude: string;

    @Column( { nullable: true } )
    referencia: string;

    @Column( "int" )
    azimute: number;


    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################

    //varios pontos podem estar no plano de vôo de varios 
    //itinerários através da tabela itinerario_ponto
    @OneToMany( type => ItinerarioPonto, itinerarios => ItinerarioPonto )
    itinerarios: ItinerarioPonto[];

    //uma linha possui várias estimativas
    @OneToMany( type => Estimativa, estimativas => Estimativa )
    estimativas: Estimativa[];

}
