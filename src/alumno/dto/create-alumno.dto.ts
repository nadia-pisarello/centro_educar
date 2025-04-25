import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAlumnoDto {

    @IsNotEmpty()
    @IsString()
    dni: string

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    legajo: number

    @IsOptional()
    @IsString()
    nivel: string

    @IsNotEmpty()
    @IsString()
    estado_actividad: string

}
