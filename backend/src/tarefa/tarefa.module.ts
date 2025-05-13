import { Module } from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { TarefaController } from './tarefa.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Tarefa } from './tarefa.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Tarefa])],
  controllers: [TarefaController],
  providers: [TarefaService],
})
export class TarefaModule {}
