import { Factura } from "src/factura/entities/factura.entity";
import { Persona } from "src/persona/entities/persona.entity";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity('alumno')
export class Alumno {

    @PrimaryColumn()
    dni_alumno: string

    @PrimaryColumn()
    legajo: number

    @OneToOne(() => Persona)
    @JoinColumn({ name: 'dni_alumno', referencedColumnName: 'dni' })
    persona: Persona

    @OneToMany(() => Factura, (factura) => factura.alumno)
    facturas: Factura[]
}
