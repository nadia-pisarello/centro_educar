import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateCuotaDto {

    @IsNotEmpty()
    @IsNumber()
    nro_cuota: number

    @IsNotEmpty()
    @IsString()
    dni_alumno: string

    @IsNotEmpty()
    @IsNumber()
    monto: number

    @IsNotEmpty()
    @IsString()
    estado_de_pago: string
}
