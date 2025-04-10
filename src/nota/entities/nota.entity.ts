import { Materia } from "src/materia/entities/materia.entity";
import { Column, Entity, JoinColumn, OneToOne, PrimaryColumn } from "typeorm";

@Entity('nota')
export class Nota {

    @PrimaryColumn()
    nombre_materia: string

    @Column()
    trimestre: number

    @Column({ type: 'double' })
    nota: number

    @OneToOne(() => Materia, (materia) => materia.nombre_materia)
    @JoinColumn({ name: 'nombre_materia' })
    materia: Materia


}
