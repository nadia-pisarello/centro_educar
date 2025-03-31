import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common';
import { CreateRolDto } from './dto/create-rol.dto';
import { UpdateRolDto } from './dto/update-rol.dto';
import { Rol } from './entities/rol.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { error } from 'console';
import { NotFoundError } from 'rxjs';
import { isNumber, isString } from 'class-validator';

@Injectable()
export class RolService {

  constructor(
    @InjectRepository(Rol)
    private readonly rolRepository: Repository<Rol>
  ) { }
  async create(createRolDto: CreateRolDto): Promise<Rol> {
    const existeIdRol = await this.rolRepository.findOne({ where: { id_rol: createRolDto.id_rol } })
    if (existeIdRol) {
      throw new BadRequestException('Ya existe ese rol')
    }
    const existeRol = await this.rolRepository.findOne({ where: { rol: createRolDto.rol } })
    if (existeRol.rol) {
      throw new BadRequestException('Ya existe ese rol')
    }
    const { ...data } = createRolDto
    const nuevoRol = this.rolRepository.create({ ...data })
    return await this.rolRepository.save(nuevoRol);
  }

  async findAll(): Promise<Rol[]> {
    return await this.rolRepository.find();
  }

  async findOne(rol: number | string): Promise<Rol> {
    let rolEncontrado: Rol | null = null
    if (typeof rol == "number") {
      rolEncontrado = await this.rolRepository.findOne({ where: { id_rol: rol } });

    } else if (typeof rol == "string") {
      rolEncontrado = await this.rolRepository.findOne({ where: { rol } })
    }
    if (!rolEncontrado) {
      throw new NotFoundException('No existe ese rol')
    }
    return rolEncontrado
  }

  async update(id_rol: number, updateRolDto: UpdateRolDto): Promise<void> {
    const rol = await this.rolRepository.findOne({ where: { id_rol } })
    if (!rol) {
      throw new NotFoundException("Rol no encontrado")
    }
    Object.assign(rol, updateRolDto)
    await this.rolRepository.update({ id_rol }, updateRolDto);
  }

  async remove(id_rol: number): Promise<void> {
    const rol = await this.rolRepository.findOne({ where: { id_rol } })
    if (!rol) {
      throw new NotFoundException("Rol no encontrado")
    }
    await this.rolRepository.delete(id_rol);
  }
}
