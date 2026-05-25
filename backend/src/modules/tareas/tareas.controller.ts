import { Controller, Get, Post, Put, Delete, Param, Body } from '@nestjs/common';
import { TareasService } from './tareas.service';
import { Tarea } from './tarea.entity';

@Controller('tareas')
export class TareasController {
  constructor(private readonly tareasService: TareasService) {}

  // crear tarea
  @Post()
  async create(@Body() tareaData: Partial<Tarea>): Promise<Tarea> {
    return this.tareasService.create(tareaData);
  }

  // listar todas las tareas
  @Get()
  async findAll(): Promise<Tarea[]> {
    return this.tareasService.findAll();
  }

  // buscar una tarea por ID
  @Get(':id')
  async findOne(@Param('id') id: number): Promise<Tarea | null> {
    return this.tareasService.findOne(id);
  }

  // actualizar tarea
  @Put(':id')
  async update(
    @Param('id') id: number,
    @Body() tareaData: Partial<Tarea>,
  ): Promise<Tarea | null> {
    return this.tareasService.update(id, tareaData);
  }

  // eliminar tarea
  @Delete(':id')
  async remove(@Param('id') id: number): Promise<void> {
    return this.tareasService.remove(id);
  }
}
