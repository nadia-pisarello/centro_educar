import { IsIn, IsNotEmpty, IsNumber, IsString } from "class-validator";

export class CreateNivelDto {

    @IsNotEmpty()
    @IsString()
    @IsIn(["1", "2", "3"] as const, { message: 'El nivel debe ser 1, 2 o 3' })
    nivel: string

    @IsNumber()
    plan_de_estudio: number
}
