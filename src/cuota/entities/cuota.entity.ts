import { Alumno } from "src/alumno/entities/alumno.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('cuota')
export class Cuota {

    @PrimaryColumn()
    nro_cuota: number

    @PrimaryColumn()
    dni_alumno: string

    @Column({ type: "double" })
    monto: number

    @Column({ type: 'date' })
    vencimiento: string

    @Column()
    estado_de_pago: string

    @ManyToOne(() => Alumno, (alumno) => alumno.dni_alumno)
    @JoinColumn([
        { name: 'dni_alumno', referencedColumnName: 'dni_alumno' },
        { name: 'legajo_alumno', referencedColumnName: 'legajo' }
    ])
    alumno: Alumno

}
