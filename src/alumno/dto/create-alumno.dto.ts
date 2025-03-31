import { IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAlumnoDto {

    @IsNotEmpty()
    @IsString()
    dni: string

    @IsNotEmpty()
    @IsNumber()
    legajo: number

    @IsOptional()
    nivel: string
}
