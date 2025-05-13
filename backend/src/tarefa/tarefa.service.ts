import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Tarefa } from './tarefa.entity';

@Injectable()
export class TarefaService {
  constructor(
    @InjectRepository(Tarefa)
    private readonly tarefaRepository: Repository<Tarefa>,
  ) {}

  criar(tarefa: Partial<Tarefa>): Promise<Tarefa> {
    const novaTarefa = this.tarefaRepository.create(tarefa);
    return this.tarefaRepository.save(novaTarefa);
  }

  encontrarTodas(): Promise<Tarefa[]> {
    return this.tarefaRepository.find({ relations: ['subtarefas'] });
  }

  async encontrarPorId(id: string): Promise<Tarefa> {
    const tarefa = await this.tarefaRepository.findOne({
      where: { id },
      relations: ['subtarefas'], // ← importante
    });
    if (!tarefa) throw new NotFoundException('Tarefa não encontrada');
    return tarefa;
  }

  async atualizar(id: string, dados: Partial<Tarefa>): Promise<Tarefa> {
    await this.encontrarPorId(id);
    await this.tarefaRepository.update(id, dados);
    return this.encontrarPorId(id);
  }

  async remover(id: string): Promise<void> {
    await this.encontrarPorId(id);
    await this.tarefaRepository.delete(id);
  }
}
