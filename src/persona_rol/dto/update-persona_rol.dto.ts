import { PartialType } from '@nestjs/mapped-types';
import { CreatePersonaRolDto } from './create-persona_rol.dto';

export class UpdatePersonaRolDto extends PartialType(CreatePersonaRolDto) {}
