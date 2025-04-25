import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCuotaDto {

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    nro_cuota: number

    @IsNotEmpty()
    @IsString()
    dni_alumno: string

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    monto: number

    @IsNotEmpty()
    @IsDateString()
    vencimiento: string

    @IsNotEmpty()
    @IsString()
    estado_de_pago: string
}
