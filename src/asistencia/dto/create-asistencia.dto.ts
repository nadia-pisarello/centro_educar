import { Type } from "class-transformer";
import { IsDate, IsDateString, IsIn, IsNotEmpty, IsNumber, IsOptional, IsString } from "class-validator";

export class CreateAsistenciaDto {

    @IsNotEmpty()
    @IsNumber()
    @Type(() => Number)
    legajo_alumno: number

    @IsNotEmpty()
    @IsDateString()
    @Type(() => Date)
    fecha: string

    @IsNotEmpty()
    @IsString()
    @IsIn(["A", "P"] as const, { message: 'Utilice A para ausente, P para presente' })
    estado: string

    @IsOptional()
    @IsString()
    justificacion: string
}
