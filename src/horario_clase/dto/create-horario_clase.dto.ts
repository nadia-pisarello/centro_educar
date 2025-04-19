import { Type } from "class-transformer";
import { IsDateString, IsNotEmpty, IsString } from "class-validator";

export class CreateHorarioClaseDto {

    @IsNotEmpty()
    @IsString()
    nombre_materia: string

    @IsNotEmpty()
    @IsString()
    nombre_aula: string

    @IsNotEmpty()
    @IsDateString()
    @Type(() => Date)
    dia: string

    @IsNotEmpty()

    hora: string
}
