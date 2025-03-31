import { Aula } from "src/aula/entities/aula.entity";
import { Materia } from "src/materia/entities/materia.entity";
import { Column, Entity, Index, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('horario_clase')
@Index('idx_dia', ['dia'])
export class HorarioClase {

    @PrimaryColumn()
    @ManyToOne(() => Materia, (materia) => materia.nombre_materia)
    @JoinColumn({ name: 'nombre_materia' })
    nombre_materia: Materia

    @PrimaryColumn()
    @ManyToOne(() => Aula, (aula) => aula.nombre)
    @JoinColumn({ name: 'nombre_aula' })
    nombre_aula: Aula

    @PrimaryColumn()
    @Column({ type: 'date' })
    dia: string

    @PrimaryColumn()
    @Column({ type: 'time' })
    hora: string

}
