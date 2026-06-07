import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

import { Proyecto } from './proyecto.entity';
import { Cliente } from '../modules/gestion/clientes/cliente.entity';

@Injectable()
export class ProyectosService {

  constructor(
    @InjectRepository(Proyecto)
    private readonly proyectosRepository: Repository<Proyecto>,

    @InjectRepository(Cliente)
    private readonly clientesRepository: Repository<Cliente>,
  ) {}

  findAll(estado?: string, clienteId?: string) {

    const where: any = {};

    if (estado) {
      where.estado = estado;
    }

    if (clienteId) {
      where.cliente = {
        id: Number(clienteId),
      };
    }

    return this.proyectosRepository.find({
      where,
      relations: ['cliente'],
    });

  }

  async findOne(id: number) {

    return this.proyectosRepository.findOne({
      where: { id },
      relations: ['cliente'],
    });

  }
 
async create(data: any) {

  if (
    data.fechaInicio &&
    data.fechaFinObjetivo &&
    new Date(data.fechaFinObjetivo) <= new Date(data.fechaInicio)
  ) {
    throw new Error(
      'La fecha de finalización debe ser posterior a la fecha de inicio',
    );
  }

  if (data.clienteId) {

    const cliente = await this.clientesRepository.findOne({
      where: { id: Number(data.clienteId) },
    });

    if (!cliente || cliente.estado !== 'Activo') {
      throw new Error('El cliente debe estar Activo');
    }

  }

  const proyecto = this.proyectosRepository.create({

      nombre: data.nombre,

      estado: data.estado,

      fechaInicio: data.fechaInicio,

      fechaFinObjetivo: data.fechaFinObjetivo,

      cliente: data.clienteId
        ? ({ id: Number(data.clienteId) } as any)
        : null,

    });

    return this.proyectosRepository.save(proyecto);

  }

async update(id: number, data: any) {

    if (
      data.fechaInicio &&
      data.fechaFinObjetivo &&
      new Date(data.fechaFinObjetivo) <= new Date(data.fechaInicio)
    ) {
      throw new Error(
        'La fecha de finalización debe ser posterior a la fecha de inicio',
      );
    }

    if (data.clienteId) {

      const cliente = await this.clientesRepository.findOne({
        where: { id: Number(data.clienteId) },
      });

      if (!cliente || cliente.estado !== 'Activo') {
        throw new Error('El cliente debe estar Activo');
      }

    }

    const proyecto = await this.findOne(id);

    if (!proyecto) {
      throw new Error('Proyecto no encontrado');
    }

    proyecto.nombre = data.nombre;

    proyecto.estado = data.estado;

    proyecto.fechaInicio = data.fechaInicio;

    proyecto.fechaFinObjetivo = data.fechaFinObjetivo;

    proyecto.cliente = data.clienteId
      ? ({ id: Number(data.clienteId) } as any)
      : null;

    return this.proyectosRepository.save(proyecto);

  }

}