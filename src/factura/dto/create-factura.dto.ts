import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFacturaDto {

    @IsNotEmpty()
    @IsString()
    tipo: string

    @IsNotEmpty()
    @IsNumber()
    numero: number

    @IsNumber()
    dni_alumno: string

    @IsNotEmpty()
    fecha_emision: string
}
