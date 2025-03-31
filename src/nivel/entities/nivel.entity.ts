import { Column, Entity, PrimaryColumn } from "typeorm";

@Entity('nivel')
export class Nivel {

    @PrimaryColumn()
    nivel: string

    @Column()
    plan_de_estudio: number
}
