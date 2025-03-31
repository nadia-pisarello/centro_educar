import { Column, Entity, OneToMany, PrimaryColumn, TableInheritance } from 'typeorm';
import { PersonaRol } from 'src/persona_rol/entities/persona_rol.entity';

@Entity('persona')
export class Persona {
    @PrimaryColumn()
    dni: string
    @Column()
    email: string;
    @Column()
    password: string;
    @Column()
    nombre_usuario: string;
    @Column()
    nombre: string;
    @Column()
    apellido: string;
    @Column()
    direccion: string;
    @Column()
    telefono: string;
    @Column({ type: 'date' })
    fecha_nacimiento: string

    @OneToMany(() => PersonaRol, (personaRol) => personaRol.dni_persona)
    roles: PersonaRol[];
}

