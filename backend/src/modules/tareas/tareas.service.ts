import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarea } from './tarea.entity';

@Injectable()
export class TareasService {
  constructor(
    @InjectRepository(Tarea)
    private readonly tareaRepository: Repository<Tarea>,
  ) {}

  // Crear tarea
  async create(tareaData: Partial<Tarea>): Promise<Tarea> {
    const tarea = this.tareaRepository.create(tareaData);
    return this.tareaRepository.save(tarea);
  }

  // Listar todas las tareas
  async findAll(): Promise<Tarea[]> {
    return this.tareaRepository.find({ relations: ['proyecto'] });
  }

  // Buscar una tarea por ID
  async findOne(id: number): Promise<Tarea | null> {
    return this.tareaRepository.findOne({
      where: { id },
      relations: ['proyecto'],
    });
  }

  // Actualizar tarea
  async update(id: number, tareaData: Partial<Tarea>): Promise<Tarea | null> {
    await this.tareaRepository.update(id, tareaData);
    return this.findOne(id);
  }

  // Eliminar tarea
  async remove(id: number): Promise<void> {
    await this.tareaRepository.delete(id);
  }
}
