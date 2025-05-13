import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Subtarefa } from './entities/subtarefa.entity';
import { CreateSubtarefaDto } from './dto/create-subtarefa.dto';
import { UpdateSubtarefaDto } from './dto/update-subtarefa.dto';
import { Tarefa } from 'src/tarefa/tarefa.entity';

@Injectable()
export class SubtarefaService {
  constructor(
    @InjectRepository(Subtarefa)
    private readonly subtarefaRepository: Repository<Subtarefa>,
    @InjectRepository(Tarefa)
    private readonly tarefaRepository: Repository<Tarefa>,
  ) {}

  async create(dto: CreateSubtarefaDto) {
    const tarefa = await this.tarefaRepository.findOneBy({ id: dto.tarefaId });
    if (!tarefa) throw new Error('Tarefa não encontrada');

    const subtarefa = this.subtarefaRepository.create({
      titulo: dto.titulo,
      tarefa,
    });
    return this.subtarefaRepository.save(subtarefa);
  }

  findAll() {
    return this.subtarefaRepository.find({ relations: ['tarefa'] });
  }

  findOne(id: string) {
    return this.subtarefaRepository.findOne({
      where: { id },
      relations: ['tarefa'],
    });
  }

  async update(id: string, dto: UpdateSubtarefaDto) {
    await this.subtarefaRepository.update(id, dto);
    return this.findOne(id);
  }

  async remove(id: string) {
    return this.subtarefaRepository.delete(id);
  }
}
