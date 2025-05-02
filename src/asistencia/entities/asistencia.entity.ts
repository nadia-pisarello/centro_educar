import { Alumno } from "src/alumno/entities/alumno.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('asistencia')
export class Asistencia {

    @PrimaryColumn()
    legajo_alumno: number

    @ManyToOne(() => Alumno, (alumno) => alumno.legajo)
    @JoinColumn([
        { name: 'dni_alumno', referencedColumnName: 'dni_alumno' },
        { name: 'legajo_alumno', referencedColumnName: 'legajo' }
    ])
    alumno: Alumno

    @PrimaryColumn()
    fecha: string

    @Column()
    estado: string

    @Column()
    justificacion: string

}
