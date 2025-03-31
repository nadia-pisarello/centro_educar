import { Alumno } from "src/alumno/entities/alumno.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('cuota')
export class Cuota {

    @PrimaryColumn()
    nro_cuota: number

    @PrimaryColumn()
    dni_alumno: string

    @ManyToOne(() => Alumno, (alumno) => alumno.dni_alumno)
    @JoinColumn({ name: 'dni_alumno' })
    alumno: Alumno

    @Column({ type: "double" })
    monto: number

    @Column()
    estado_de_pago: string
}
