import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { FamiliarService } from './familiar.service';
import { CreateFamiliarDto } from './dto/create-familiar.dto';
import { UpdateFamiliarDto } from './dto/update-familiar.dto';

@Controller('familiar')
export class FamiliarController {
  constructor(private readonly familiarService: FamiliarService) { }

  @Post()
  create(@Body() createFamiliarDto: CreateFamiliarDto) {
    return this.familiarService.create(createFamiliarDto);
  }

  @Get()
  findAll() {
    return this.familiarService.findAll();
  }

  @Get(':dni')
  findOne(@Param('dni') dni: string) {
    return this.familiarService.findOne(dni);
  }

  @Patch(':dni')
  update(@Param('dni') dni: string, @Body() updateFamiliarDto: UpdateFamiliarDto) {
    return this.familiarService.update(dni, updateFamiliarDto);
  }

  @Delete(':dni')
  remove(@Param('dni') dni: string) {
    return this.familiarService.remove(dni);
  }
}
