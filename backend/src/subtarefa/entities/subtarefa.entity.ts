import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  ManyToOne,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Tarefa } from 'src/tarefa/tarefa.entity';

@Entity()
export class Subtarefa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column({ default: false })
  finalizada: boolean;

  @CreateDateColumn()
  criadoEm: Date;

  @UpdateDateColumn()
  atualizadoEm: Date;

  @ManyToOne(() => Tarefa, (tarefa) => tarefa.subtarefas, {
    onDelete: 'CASCADE',
  })
  tarefa: Tarefa;
}
