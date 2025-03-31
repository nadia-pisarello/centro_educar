import { Module } from '@nestjs/common';
import { FamiliarService } from './familiar.service';
import { FamiliarController } from './familiar.controller';
import { Familiar } from './entities/familiar.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Persona } from 'src/persona/entities/persona.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Familiar, Persona])],
  controllers: [FamiliarController],
  providers: [FamiliarService],
})
export class FamiliarModule { }
