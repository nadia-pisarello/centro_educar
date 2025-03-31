import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('aula')
export class Aula {
    @PrimaryColumn()
    nombre: string
    @Column()
    ubicacion: string
}
