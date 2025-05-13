import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  Put,
} from '@nestjs/common';
import { TarefaService } from './tarefa.service';
import { Tarefa } from './tarefa.entity';

@Controller('tarefas')
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) {}

  @Post()
  criar(@Body() tarefa: Partial<Tarefa>) {
    return this.tarefaService.criar(tarefa);
  }

  @Get()
  encontrarTodas() {
    return this.tarefaService.encontrarTodas();
  }

  @Get(':id')
  encontrarPorId(@Param('id') id: string) {
    return this.tarefaService.encontrarPorId(id);
  }

  @Put(':id')
  atualizar(@Param('id') id: string, @Body() tarefa: Partial<Tarefa>) {
    return this.tarefaService.atualizar(id, tarefa);
  }

  @Delete(':id')
  remover(@Param('id') id: string) {
    return this.tarefaService.remover(id);
  }
}
