import { Alumno } from "src/alumno/entities/alumno.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('nivel')
export class Nivel {

    @PrimaryColumn()
    nivel: string

    @Column()
    plan_de_estudio: number

    @OneToMany(() => Alumno, alumno => alumno.nivel)
    alumnos: Alumno[]
}
