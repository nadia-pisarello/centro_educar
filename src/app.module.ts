import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { CuotaModule } from './cuota/cuota.module';
import { HorarioClaseModule } from './horario_clase/horario_clase.module';
import { NotaModule } from './nota/nota.module';
import { NivelModule } from './nivel/nivel.module';
import { DetalleFacturaModule } from './detalle_factura/detalle_factura.module';
import { FacturaModule } from './factura/factura.module';
import { AulaModule } from './aula/aula.module';
import { MateriaModule } from './materia/materia.module';
import { FamiliarModule } from './familiar/familiar.module';
import { DocenteModule } from './docente/docente.module';
import { FamiliarAlumnoModule } from './familiar_alumno/familiar_alumno.module';
import { RolModule } from './rol/rol.module';
import { PersonaRolModule } from './persona_rol/persona_rol.module';
import { AsistenciaModule } from './asistencia/asistencia.module';
import { PersonaModule } from './persona/persona.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ConfigModule } from '@nestjs/config';
import { AlumnoModule } from './alumno/alumno.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      expandVariables: true,
    }),
    TypeOrmModule.forRoot({
      type: "mysql",
      host: process.env.DB_HOST,
      port: 3306,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_NAME,
      autoLoadEntities: true,
      synchronize: false, // cuando necesite sincronizar colocar en true mejor usar migraciones(?)
      logging: true,
    }),
    AlumnoModule,
    DocenteModule,
    FamiliarModule,
    MateriaModule,
    AulaModule,
    FacturaModule,
    DetalleFacturaModule,
    NivelModule,
    NotaModule,
    HorarioClaseModule,
    CuotaModule,
    FamiliarAlumnoModule,
    RolModule,
    PersonaRolModule,
    PersonaModule,
    AsistenciaModule],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule { }
