import { Alumno } from "src/alumno/entities/alumno.entity";
import { Nivel } from "src/nivel/entities/nivel.entity";
import { Nota } from "src/nota/entities/nota.entity";
import { Column, Entity, JoinColumn, JoinTable, ManyToMany, ManyToOne, OneToMany, PrimaryColumn } from "typeorm";

@Entity('materia')
export class Materia {

    @PrimaryColumn()
    nombre_materia: string

    @Column()
    nota_final: number

    @Column()
    nombre_nivel: string

    @ManyToOne(() => Nivel, (nivel) => nivel.nivel)
    @JoinColumn({ name: 'nombre_nivel' })
    nivel: Nivel

    @ManyToMany(() => Alumno, { cascade: true })
    @JoinTable({
        name: 'materias_alumnos',
        joinColumn: {
            name: "materia",
            referencedColumnName: "nombre_materia"
        },
        inverseJoinColumn: {
            name: "legajo_alumno",
            referencedColumnName: "legajo"
        }
    })
    alumnos: Alumno[]

}
