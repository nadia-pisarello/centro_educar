import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateDocenteDto {

    @IsNotEmpty()
    @IsNumber()
    legajo: number

    @IsNotEmpty()
    @IsString()
    dni_docente: string

}
