import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Subtarefa } from './entities/subtarefa.entity';
import { Tarefa } from 'src/tarefa/tarefa.entity';
import { SubtarefaService } from './subtarefa.service';
import { SubtarefaController } from './subtarefa.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Subtarefa, Tarefa])],
  controllers: [SubtarefaController],
  providers: [SubtarefaService],
})
export class SubtarefaModule {}
