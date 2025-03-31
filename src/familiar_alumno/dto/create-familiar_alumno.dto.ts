import { IsNotEmpty } from "class-validator";

export class CreateFamiliarAlumnoDto {

    @IsNotEmpty()
    dni_familiar: string

    @IsNotEmpty()
    dni_alumno: string
}
