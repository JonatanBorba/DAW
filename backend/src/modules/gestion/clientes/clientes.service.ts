import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Cliente } from './cliente.entity';

@Injectable()
export class ClientesService {

  constructor(
    @InjectRepository(Cliente)
    private clientesRepository: Repository<Cliente>,
  ) {}

  findAll() {
    return this.clientesRepository.find();
  }

  create(data: any) {
    const cliente = this.clientesRepository.create(data);
    return this.clientesRepository.save(cliente);
  }
}