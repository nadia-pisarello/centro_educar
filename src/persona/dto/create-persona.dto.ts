import { IsDateString, IsEmail, IsNotEmpty, IsOptional, IsString, Length } from "class-validator";

export class CreatePersonaDto {

    @IsNotEmpty()
    @Length(7, 10)
    dni: string

    @IsNotEmpty()
    @IsEmail()
    email: string

    @IsNotEmpty()
    @IsString()
    nombre_usuario: string

    @IsNotEmpty()
    @IsString()
    @Length(8, 12, { message: 'La contraseña debe tener mínimo 8 caracteres y como máximo 12' })
    password: string

    @IsNotEmpty()
    @IsString()
    nombre: string

    @IsNotEmpty()
    @IsString()
    apellido: string

    @IsNotEmpty()
    @IsString()
    direccion: string

    @IsOptional()
    @IsString()
    telefono: string

    @IsNotEmpty()
    @IsDateString()
    fecha_nacimiento: string
}
