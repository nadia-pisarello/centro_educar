import { PersonaRol } from "src/persona_rol/entities/persona_rol.entity";
import { Column, Entity, OneToMany, PrimaryColumn } from "typeorm";

@Entity('rol')
export class Rol {

    @PrimaryColumn()
    id_rol: number

    @Column({ unique: true })
    rol: string

    @OneToMany(() => PersonaRol, (personaRol) => personaRol.id_rol)
    personas: PersonaRol[]
}
