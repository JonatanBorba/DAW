import { Entity, PrimaryGeneratedColumn, Column, ManyToOne } from 'typeorm';
import { Proyecto } from '../../proyectos/proyecto.entity';

@Entity('tareas')
export class Tarea {
  @PrimaryGeneratedColumn()
  id!: number;

  @Column()
  descripcion!: string;

  @Column({
    type: 'enum',
    enum: ['Pendiente', 'Finalizado', 'Baja'],
    default: 'Pendiente',
  })
  estado!: string;

  @ManyToOne(() => Proyecto, proyecto => proyecto.tareas, { onDelete: 'CASCADE' })
  proyecto!: Proyecto;
}