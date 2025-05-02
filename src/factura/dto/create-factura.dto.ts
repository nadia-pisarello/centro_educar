import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateFacturaDto {

    @IsNotEmpty()
    @IsString()
    tipo: string

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    numero: number

    @IsNotEmpty()
    @IsString()
    dni_alumno: string

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    legajo_alumno: number

    @IsNotEmpty()
    @IsDateString()
    fecha_emision: string
}
