import { Alumno } from "src/alumno/entities/alumno.entity";
import { Nivel } from "src/nivel/entities/nivel.entity";
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
    @JoinColumn()
    nivel: Nivel

    @ManyToMany(() => Alumno, { cascade: true })
    @JoinTable({
        name: 'materias_alumnos',
        joinColumns: [
            { name: 'nombre_materia', referencedColumnName: 'nombre_materia' }
        ],
        inverseJoinColumns: [
            { name: 'dni_alumno', referencedColumnName: 'dni_alumno' },
            { name: 'legajo_alumno', referencedColumnName: 'legajo' }
        ]
    })
    alumnos: Alumno[]

}
