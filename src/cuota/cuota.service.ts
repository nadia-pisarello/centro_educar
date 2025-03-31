import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateCuotaDto } from './dto/create-cuota.dto';
import { UpdateCuotaDto } from './dto/update-cuota.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Cuota } from './entities/cuota.entity';
import { Repository } from 'typeorm';

@Injectable()
export class CuotaService {
  constructor(
    @InjectRepository(Cuota)
    private readonly cuotaRepository: Repository<Cuota>
  ) { }

  async create(createCuotaDto: CreateCuotaDto): Promise<Cuota> {
    const cuota = await this.cuotaRepository.findOne({ where: { nro_cuota: createCuotaDto.nro_cuota } })
    if (cuota) {
      throw new BadRequestException('Esta cuota ya existe')
    }
    const nuevaCuota = this.cuotaRepository.create(createCuotaDto)
    return this.cuotaRepository.save(nuevaCuota);
  }

  async findAll(): Promise<Cuota[]> {
    return await this.cuotaRepository.find();
  }

  async findOne(nro_cuota: number): Promise<Cuota> {
    const cuota = await this.cuotaRepository.findOne({ where: { nro_cuota } })
    if (!cuota) {
      throw new NotFoundException('La cuota no existe')
    }
    return cuota;
  }

  async update(nro_cuota: number, updateCuotaDto: UpdateCuotaDto): Promise<void> {
    const cuota = await this.cuotaRepository.findOne({ where: { nro_cuota } })
    if (!cuota) {
      throw new NotFoundException('La cuota no existe')
    }
    await this.cuotaRepository.update(nro_cuota, updateCuotaDto);
  }

  async remove(nro_cuota: number): Promise<void> {
    const cuota = await this.cuotaRepository.findOne({ where: { nro_cuota } })
    if (!cuota) {
      throw new NotFoundException('La cuota no existe')
    }
    this.cuotaRepository.delete(nro_cuota);
  }
}
