import { IsNotEmpty, IsNumber } from "class-validator";

export class CreateNotaDto {

    @IsNotEmpty()
    @IsNumber()
    nota: number

    @IsNotEmpty()
    nombre_materia: string

    @IsNotEmpty()
    @IsNumber()
    trimestre: number
}
