import { IsNotEmpty, IsNumber, IsString, Length } from "class-validator"

export class CreateRolDto {

    @IsNotEmpty()
    @IsNumber()
    id_rol: number

    @IsNotEmpty()
    @IsString()
    rol: string
}
