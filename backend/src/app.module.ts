import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TarefaModule } from './tarefa/tarefa.module';
import { SubtarefaModule } from './subtarefa/subtarefa.module';
import { Tarefa } from './tarefa/tarefa.entity';
import { Subtarefa } from './subtarefa/entities/subtarefa.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'sqlite',
      database: 'tarefas.db',
      entities: [Tarefa, Subtarefa],
      synchronize: true,
    }),
    TarefaModule,
    SubtarefaModule,
  ],
})
export class AppModule {}
