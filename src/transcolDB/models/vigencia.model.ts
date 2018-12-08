import { Column, Entity, OneToMany } from "typeorm";
import { Auditoria } from "./Auditoria.model";
import { LinhaTarifaVigencia } from "./LinhaTarifaVigencia.model";

@Entity()
export class Vigencia extends Auditoria {

    @Column( 'bit' )
    domingo: boolean;

    @Column( 'bit' )
    segunda: boolean;

    @Column( 'bit' )
    terca: boolean;

    @Column( 'bit' )
    quarta: boolean;

    @Column( 'bit' )
    quinta: boolean;

    @Column( 'bit' )
    sexta: boolean;

    @Column( 'bit' )
    sabado: boolean;

    @OneToMany( type => LinhaTarifaVigencia, linhatarifavigencia_id => LinhaTarifaVigencia )
    linhatarifavigencia_id: number;

}
