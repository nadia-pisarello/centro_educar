import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNotaDto {

    @IsNotEmpty()
    @IsString()
    nombre_materia: string

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    trimestre: number

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    nota: number
}
