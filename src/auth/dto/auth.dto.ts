import { IsString } from "class-validator"

export class AuthDto {

    @IsString()
    usuario: string

    @IsString()
    password: string
}