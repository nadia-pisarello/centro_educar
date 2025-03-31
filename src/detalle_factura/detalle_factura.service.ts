import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateDetalleFacturaDto } from './dto/create-detalle_factura.dto';
import { UpdateDetalleFacturaDto } from './dto/update-detalle_factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { DetalleFactura } from './entities/detalle_factura.entity';
import { Repository } from 'typeorm';
import { NotFoundError } from 'rxjs';

@Injectable()
export class DetalleFacturaService {
  constructor(
    @InjectRepository(DetalleFactura)
    private readonly detalleFacturaRepository: Repository<DetalleFactura>
  ) { }

  async create(createDetalleFacturaDto: CreateDetalleFacturaDto): Promise<DetalleFactura> {
    const detalle_factura = await this.detalleFacturaRepository.findOneBy({
      tipo_factura: createDetalleFacturaDto.tipo_factura,
      nro_factura: createDetalleFacturaDto.nro_factura,
      nro_cuota: createDetalleFacturaDto.nro_cuota
    })

    if (detalle_factura) {
      throw new BadRequestException('Este detalle ya existe')
    }
    const nuevoDetalle = this.detalleFacturaRepository.create(createDetalleFacturaDto)
    return await this.detalleFacturaRepository.save(nuevoDetalle);
  }

  async findAll(): Promise<DetalleFactura[]> {
    return await this.detalleFacturaRepository.find();
  }

  async findOne(tipo_factura: string, nro_factura: number, nro_cuota: number): Promise<DetalleFactura> {
    const detalle = await this.detalleFacturaRepository.findOneBy({
      tipo_factura, nro_factura, nro_cuota
    })
    if (!detalle) {
      throw new NotFoundException('El detalle de la factura no existe')
    }
    return detalle;
  }

  async update(tipo_factura: string, nro_factura: number, nro_cuota: number, updateDetalleFacturaDto: UpdateDetalleFacturaDto): Promise<void> {
    const detalle = await this.detalleFacturaRepository.findOneBy({
      tipo_factura, nro_factura, nro_cuota
    })
    if (!detalle) {
      throw new NotFoundException('El detalle de la factura no existe')
    };
    await this.detalleFacturaRepository.update({ tipo_factura, nro_factura, nro_cuota }, updateDetalleFacturaDto)
  }

  async remove(tipo_factura: string, nro_factura: number, nro_cuota: number): Promise<void> {
    const detalle = await this.detalleFacturaRepository.findOneBy({
      tipo_factura, nro_factura, nro_cuota
    })
    if (!detalle) {
      throw new NotFoundException('El detalle de la factura no existe')
    };
    await this.detalleFacturaRepository.delete(detalle)
  }
}
