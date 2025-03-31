import { PartialType } from '@nestjs/mapped-types';
import { CreateFamiliarAlumnoDto } from './create-familiar_alumno.dto';

export class UpdateFamiliarAlumnoDto extends PartialType(CreateFamiliarAlumnoDto) {}
