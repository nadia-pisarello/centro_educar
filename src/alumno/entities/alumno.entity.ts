import { Factura } from "src/factura/entities/factura.entity";
import { Nivel } from "src/nivel/entities/nivel.entity";
import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity('alumno')
export class Alumno {

    @PrimaryColumn()
    dni_alumno: string

    @PrimaryColumn()
    legajo: number

    @Column()
    estado_actividad: string

    @OneToOne(() => Persona)
    @JoinColumn({ name: 'dni_alumno', referencedColumnName: 'dni' })
    persona: Persona

    @OneToMany(() => Factura, (factura) => factura.alumno)
    facturas: Factura[]

    @ManyToOne(() => Nivel, nivel => nivel.alumnos)
    @JoinColumn({ name: 'nivel' })
    nivel: Nivel
}
