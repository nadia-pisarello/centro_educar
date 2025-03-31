import { Persona } from "src/persona/entities/persona.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('familiar')
export class Familiar {

    @PrimaryColumn()
    dni_familiar: string

    @Column()
    parentesco: string

    @ManyToOne(() => Persona, (persona) => persona.dni)
    @JoinColumn({ name: 'dni_familiar' })
    persona: Persona
}
