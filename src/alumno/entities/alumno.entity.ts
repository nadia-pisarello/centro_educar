import { Factura } from "src/factura/entities/factura.entity";
import { Persona } from "src/persona/entities/persona.entity";
import { Entity, JoinColumn, OneToMany, OneToOne, PrimaryColumn } from "typeorm";

@Entity('alumno')
export class Alumno {

    @PrimaryColumn()
    dni_alumno: string

    @PrimaryColumn()
    legajo: number

    @OneToOne(() => Persona, (persona) => persona.dni)
    @JoinColumn()
    persona: Persona

    @OneToMany(() => Factura, (factura) => factura.alumno)
    facturas: Factura[]
}
