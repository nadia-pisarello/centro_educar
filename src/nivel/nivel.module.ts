import { Module } from '@nestjs/common';
import { NivelService } from './nivel.service';
import { NivelController } from './nivel.controller';
import { Nivel } from './entities/nivel.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Nivel])],
  controllers: [NivelController],
  providers: [NivelService],
})
export class NivelModule { }
