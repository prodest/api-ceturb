import { Auditoria } from "./Auditoria.model";
import { Entity, ManyToOne, JoinColumn } from "typeorm";
import { Linha } from "./Linha.model";
import { Vigencia } from "./vigencia.model";
import { Tarifa } from "./Tarifa.model";

@Entity( { name: 'linha_tarifa_vigencia' } )
export class LinhaTarifaVigencia extends Auditoria {

    @ManyToOne( type => Linha, { nullable: false } )
    @JoinColumn( { name: "linha_id" } )
    linha_id: number;


    @ManyToOne( type => Vigencia, { nullable: false } )
    @JoinColumn( { name: "vigencia_id" } )
    vigencia_id: number;


    @ManyToOne( type => Tarifa, { nullable: false } )
    @JoinColumn( { name: "tarifa_id" } )
    tarifa_id: number;

}
