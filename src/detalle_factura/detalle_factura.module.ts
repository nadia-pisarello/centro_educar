import { Module } from '@nestjs/common';
import { DetalleFacturaService } from './detalle_factura.service';
import { DetalleFacturaController } from './detalle_factura.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { DetalleFactura } from './entities/detalle_factura.entity';

@Module({
  imports: [TypeOrmModule.forFeature([DetalleFactura])],
  controllers: [DetalleFacturaController],
  providers: [DetalleFacturaService],
})
export class DetalleFacturaModule { }
