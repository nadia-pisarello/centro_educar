import { Type } from "class-transformer";
import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateMateriaDto {

    @IsNotEmpty()
    nombre_materia: string

    @IsNotEmpty()
    @IsString()
    nombre_nivel: string

    @IsOptional()
    @IsNumber()
    @Type(() => Number)
    nota_final: number
}
