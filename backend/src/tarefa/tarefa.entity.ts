import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Subtarefa } from 'src/subtarefa/entities/subtarefa.entity';
import { OneToMany } from 'typeorm';

@Entity()
export class Tarefa {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column()
  titulo: string;

  @Column({ type: 'text' })
  descricao: string;

  @Column({ default: false })
  concluida: boolean;

  @CreateDateColumn({ name: 'data_criacao' })
  dataCriacao: Date;

  @UpdateDateColumn({ name: 'data_atualizacao' })
  dataAtualizacao: Date;

  @OneToMany(() => Subtarefa, (subtarefa) => subtarefa.tarefa, {
    cascade: true,
  })
  subtarefas: Subtarefa[];
}
