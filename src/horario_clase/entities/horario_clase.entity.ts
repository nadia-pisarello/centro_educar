import { Aula } from "src/aula/entities/aula.entity";
import { Materia } from "src/materia/entities/materia.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('horario_clase')
@Index('idx_dia', ['dia'])
export class HorarioClase {

    @PrimaryColumn()
    nombre_materia: string

    @ManyToOne(() => Materia, (materia) => materia.nombre_materia)
    @JoinColumn({ name: 'nombre_materia' })
    materia: Materia

    @PrimaryColumn()
    nombre_aula: string

    @ManyToOne(() => Aula, (aula) => aula.nombre)
    @JoinColumn({ name: 'nombre_aula' })
    aula: Aula

    @PrimaryColumn()
    @Column({ type: 'date' })
    dia: string

    @PrimaryColumn()
    @Column({ type: 'time' })
    hora: string

}
