import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateFacturaDto } from './dto/create-factura.dto';
import { UpdateFacturaDto } from './dto/update-factura.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Factura } from './entities/factura.entity';
import { Not, Repository } from 'typeorm';

@Injectable()
export class FacturaService {
  constructor(
    @InjectRepository(Factura)
    private readonly facturaRepository: Repository<Factura>
  ) { }

  async create(createFacturaDto: CreateFacturaDto): Promise<Factura> {
    const factura = await this.facturaRepository.findOneBy({
      tipo: createFacturaDto.tipo,
      numero: createFacturaDto.numero
    })
    if (factura) {
      throw new BadRequestException('La factura ya existe')
    }
    const nuevaFactura = this.facturaRepository.create(createFacturaDto)
    return await this.facturaRepository.save(nuevaFactura);
  }

  async findAll(): Promise<Factura[]> {
    return await this.facturaRepository.find({ relations: ['alumno'] });
  }

  async obtenerFacturasPorDniAlumno(dni_alumno: string): Promise<Factura[]> {
    return await this.facturaRepository.find({
      where: {
        alumno: { dni_alumno }
      },
      relations: ['alumno']
    });
  }

  async findOne(tipo: string, numero: number, dni_alumno: string): Promise<Factura> {
    const factura = await this.facturaRepository.findOne({
      where: {
        tipo, numero, alumno: { dni_alumno }
      },
      relations: ['alumno']
    })
    if (!factura) {
      throw new NotFoundException('Factura no encontrada o no pertenece al alumno')
    }
    return factura;
  }

  async update(tipo: string, numero: number, updateFacturaDto: UpdateFacturaDto): Promise<void> {
    await this.verificarExistenciaFactura(tipo, numero)
    await this.facturaRepository.update({ tipo, numero }, updateFacturaDto);
  }

  async remove(tipo: string, numero: number): Promise<void> {
    await this.verificarExistenciaFactura(tipo, numero)
    await this.facturaRepository.delete({ tipo, numero });
  }

  private async verificarExistenciaFactura(tipo: string, numero: number) {
    const factura = await this.facturaRepository.findOneBy({ tipo, numero })
    if (!factura) {
      throw new NotFoundException('Factura no encontrada')
    }
    return factura
  }
}
