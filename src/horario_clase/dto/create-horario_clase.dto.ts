import { IsNotEmpty } from "class-validator";

export class CreateHorarioClaseDto {

    @IsNotEmpty()
    nombre_materia: string

    @IsNotEmpty()
    nombre_aula: string

    @IsNotEmpty()
    date: string

    @IsNotEmpty()
    hora: string
}
