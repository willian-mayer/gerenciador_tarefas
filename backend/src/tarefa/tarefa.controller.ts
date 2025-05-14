// tarefa.controller.ts
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
import { CreateTarefaDto, UpdateTarefaDto } from './tarefa.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Tarefas') // Para agrupar no Swagger
@Controller('tasks')
export class TarefaController {
  constructor(private readonly tarefaService: TarefaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova tarefa' })
  @ApiResponse({ status: 201, description: 'Tarefa criada com sucesso.' })
  criar(@Body() tarefa: CreateTarefaDto) {
    return this.tarefaService.criar(tarefa);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as tarefas' })
  encontrarTodas() {
    return this.tarefaService.encontrarTodas();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter tarefa por ID' })
  encontrarPorId(@Param('id') id: string) {
    return this.tarefaService.encontrarPorId(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar tarefa existente' })
  atualizar(@Param('id') id: string, @Body() tarefa: UpdateTarefaDto) {
    return this.tarefaService.atualizar(id, tarefa);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover tarefa por ID' })
  remover(@Param('id') id: string) {
    return this.tarefaService.remover(id);
  }
}
