import { Alumno } from "src/alumno/entities/alumno.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('asistencia')
export class Asistencia {

    @PrimaryColumn()
    legajo_alumno: number

    @ManyToOne(() => Alumno, (alumno) => alumno.legajo)
    @JoinColumn({ name: 'legajo_alumno' })
    alumno: Alumno

    @PrimaryColumn()
    fecha: string

    @Column()
    estado: string

    @Column()
    justificacion: string

}
