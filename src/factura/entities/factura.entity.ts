import { Alumno } from "src/alumno/entities/alumno.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('factura')
export class Factura {

    @PrimaryColumn()
    tipo: string

    @PrimaryColumn()
    numero: number

    @Column({ type: 'date' })
    fecha_emision: string

    @ManyToOne(() => Alumno, (alumno) => alumno.dni_alumno)
    @JoinColumn({ name: 'dni_alumno' })
    alumno: Alumno
}
