import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('docente')
export class Docente {

    @Column({ unique: true })
    legajo: number

    @PrimaryColumn()
    dni_docente: string

    @ManyToOne(() => Persona, (persona) => persona.dni)
    @JoinColumn({ name: 'dni_docente' })
    persona: Persona
}
