import { Alumno } from "src/alumno/entities/alumno.entity";
import { Familiar } from "src/familiar/entities/familiar.entity";
import { Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('familiar_alumno')
export class FamiliarAlumno {

    @PrimaryColumn()
    dni_familiar: string

    @PrimaryColumn()
    dni_alumno: string

    @ManyToOne(() => Familiar, (familiar) => familiar.dni_familiar)
    @JoinColumn({ name: 'dni_familiar', referencedColumnName: 'dni_familiar' })
    familiar: Familiar

    @ManyToOne(() => Alumno, (alumno) => alumno.dni_alumno)
    @JoinColumn({ name: 'dni_alumno', referencedColumnName: 'dni_alumno' })
    alumno: Alumno
}
