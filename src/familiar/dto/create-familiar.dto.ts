import { IsNotEmpty, IsString } from "class-validator";

export class CreateFamiliarDto {

    @IsNotEmpty()
    @IsString()
    dni_familiar: string

    @IsNotEmpty()
    @IsString()
    parentesco: string

}
