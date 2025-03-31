import { Materia } from "src/materia/entities/materia.entity";
import { Column, Entity, JoinColumn, ManyToOne, OneToOne, PrimaryColumn } from "typeorm";

@Entity('nota')
export class Nota {

    @PrimaryColumn({ type: 'double' })
    nota: number

    @PrimaryColumn()
    nombre_materia: string

    @Column()
    trimestre: number

    @OneToOne(() => Materia, (materia) => materia.nombre_materia)
    @JoinColumn({ name: 'nombre_materia' })
    materia: Materia


}
