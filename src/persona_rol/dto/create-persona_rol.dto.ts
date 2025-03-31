import { IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreatePersonaRolDto {

    @IsNotEmpty()
    @IsString()
    dni_persona: string

    @IsNotEmpty()
    @IsNumber()
    id_rol: number
}
