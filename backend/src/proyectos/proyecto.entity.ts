import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
  OneToMany,
} from 'typeorm';

import { Cliente } from '../modules/gestion/clientes/cliente.entity';
import { Tarea } from '../modules/tareas/tarea.entity';

export enum EstadoProyecto {
  ACTIVO = 'Activo',
  FINALIZADO = 'Finalizado',
  BAJA = 'Baja',
}

@Entity('proyectos')
export class Proyecto {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column({ unique: true })
  nombre!: string;

  @Column({
    type: 'enum',
    enum: EstadoProyecto,
    default: EstadoProyecto.ACTIVO,
  })
  estado!: EstadoProyecto;

  @ManyToOne(() => Cliente, {
    nullable: true,
  })
  @JoinColumn({ name: 'clienteId' })
  cliente!: Cliente | null;

  @OneToMany(() => Tarea, tarea => tarea.proyecto)
  tareas!: Tarea[];
}