import { Alumno } from "src/alumno/entities/alumno.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('factura')
export class Factura {

    @PrimaryColumn()
    tipo: string

    @PrimaryColumn()
    numero: number

    @Column()
    dni_alumno: string

    @Column()
    legajo_alumno: number

    @Column({ type: 'date' })
    fecha_emision: string

    @ManyToOne(() => Alumno, (alumno) => alumno.facturas)
    @JoinColumn([
        { name: 'dni_alumno', referencedColumnName: 'dni_alumno' },
        { name: 'legajo_alumno', referencedColumnName: 'legajo' }
    ])
    alumno: Alumno
}
