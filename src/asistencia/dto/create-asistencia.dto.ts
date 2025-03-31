import { IsDate, IsIn, IsNotEmpty, IsOptional, IsString } from "class-validator";

export class CreateAsistenciaDto {

    @IsNotEmpty()
    legajo_alumno: number

    @IsNotEmpty()
    @IsDate()
    fecha: string

    @IsNotEmpty()
    @IsString()
    @IsIn(["A", "P"] as const, { message: 'Utilice A para ausente, P para presente' })
    estado: string

    @IsOptional()
    @IsString()
    justificacion: string
}
