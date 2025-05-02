import { Cuota } from "src/cuota/entities/cuota.entity";
import { Factura } from "src/factura/entities/factura.entity";
import { Column, Entity, JoinColumn, ManyToOne, PrimaryColumn } from "typeorm";

@Entity('detalle_factura')
export class DetalleFactura {


    @PrimaryColumn()
    tipo_factura: string

    @PrimaryColumn()
    nro_factura: number

    @PrimaryColumn()
    nro_cuota: number

    @Column()
    cantidad: number

    @Column()
    precio_unitario: number

    @ManyToOne(() => Factura)
    @JoinColumn([
        { name: 'tipo_factura', referencedColumnName: 'tipo' },
        { name: 'nro_factura', referencedColumnName: 'numero' },
    ])
    factura: Factura

    @ManyToOne(() => Cuota)
    @JoinColumn({ name: 'nro_cuota', referencedColumnName: 'nro_cuota' })
    cuota: Cuota
}
