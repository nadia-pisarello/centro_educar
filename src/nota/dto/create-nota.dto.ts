import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotaDto {

    @IsNotEmpty()
    @IsString()
    nombre_materia: string

    @IsNotEmpty()
    @IsNumber()
    trimestre: number

    @IsNotEmpty()
    @IsNumber()
    nota: number
}
