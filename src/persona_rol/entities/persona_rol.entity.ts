import { Persona } from "src/persona/entities/persona.entity";
import { Rol } from "src/rol/entities/rol.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('persona_rol')
export class PersonaRol {

    @PrimaryColumn()
    dni_persona: string

    @PrimaryColumn()
    id_rol: number

    @ManyToOne(() => Persona, (persona) => persona.roles)
    @JoinColumn({ name: 'dni_persona' })
    persona: Persona

    @ManyToOne(() => Rol, (rol) => rol.personas)
    @JoinColumn({ name: 'id_rol' })
    rol: Rol
}
