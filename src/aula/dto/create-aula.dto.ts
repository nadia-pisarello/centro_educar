import { IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAulaDto {

    @IsNotEmpty()
    @IsString()
    nombre: string

    @IsOptional()
    ubicacion: string
}
