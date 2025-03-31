import { IsNotEmpty, IsNumber, IsString } from "class-validator"

export class CreateDetalleFacturaDto {

    @IsNotEmpty()
    @IsString()
    tipo_factura: string

    @IsNotEmpty()
    @IsNumber()
    nro_factura: number

    @IsNotEmpty()
    @IsNumber()
    nro_cuota: number

    @IsNotEmpty()
    @IsNumber()
    cantidad: number

    @IsNotEmpty()
    @IsNumber()
    precio_unitario: number
}