import { Entity, Column, ManyToOne, JoinColumn, OneToMany } from 'typeorm';
import { Linha } from './Linha.model';
import { Viagem } from './Viagem.model';
import { PontoGeografico } from './PontoGeografico.model';
import { ItinerarioPonto } from './itinerario_ponto.model';
import { Auditoria } from './Auditoria.model';
import { ApiModelProperty } from '@nestjs/swagger';


@Entity()
export class Itinerario extends Auditoria {
    @Column()
    @ApiModelProperty()
    id_geocontrol: number;

    @Column()
    @ApiModelProperty()
    codigo: string;

    @Column()
    @ApiModelProperty()
    bandeira: string;


    //###################################################################
    //############################ RELAÇÕES #############################
    //###################################################################

    //varios itinerários trabalham para uma linha
    @ManyToOne( type => Linha, { nullable: false } )
    @JoinColumn( { name: "linha_id" } )
    @ApiModelProperty()
    linha_id: number;

    //um itinerário faz varias viagens
    @OneToMany( type => Viagem, viagens => Viagem )
    viagens: Viagem[];

    //Vários Itinerários passam por vários pontos via tabela itinerario_ponto
    @OneToMany( type => ItinerarioPonto, pontos => ItinerarioPonto )
    pontos: ItinerarioPonto[];

    //um itinerario possui varios Pontos Geograficos ordenados como um shape
    @OneToMany( type => PontoGeografico, shape => PontoGeografico )
    shape: PontoGeografico[];
}
