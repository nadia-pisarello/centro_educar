import { PartialType } from '@nestjs/mapped-types';
import { CreateHorarioClaseDto } from './create-horario_clase.dto';

export class UpdateHorarioClaseDto extends PartialType(CreateHorarioClaseDto) {}
