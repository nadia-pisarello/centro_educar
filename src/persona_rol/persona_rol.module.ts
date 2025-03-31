import { Module } from '@nestjs/common';
import { PersonaRolService } from './persona_rol.service';
import { PersonaRolController } from './persona_rol.controller';
import { PersonaRol } from './entities/persona_rol.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from 'src/persona/entities/persona.entity';
import { Rol } from 'src/rol/entities/rol.entity';

@Module({
  imports: [TypeOrmModule.forFeature([PersonaRol, Persona, Rol])],
  controllers: [PersonaRolController],
  providers: [PersonaRolService],
})
export class PersonaRolModule { }
