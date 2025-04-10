import { IsNotEmpty, IsNumber, IsOptional } from "class-validator";

export class CreateMateriaDto {

    @IsNotEmpty()
    nombre_materia: string

    @IsNotEmpty()
    nombre_nivel: string

    @IsOptional()
    @IsNumber()
    nota_final: number
}
