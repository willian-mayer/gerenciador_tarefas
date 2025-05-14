import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Put,
  Delete,
} from '@nestjs/common';
import { SubtarefaService } from './subtarefa.service';
import { CreateSubtarefaDto } from './dto/create-subtarefa.dto';
import { UpdateSubtarefaDto } from './dto/update-subtarefa.dto';
import { ApiTags, ApiOperation, ApiResponse } from '@nestjs/swagger';

@ApiTags('Subtarefas')
@Controller('subtasks')
export class SubtarefaController {
  constructor(private readonly service: SubtarefaService) {}

  @Post()
  @ApiOperation({ summary: 'Criar nova subtarefa' })
  @ApiResponse({ status: 201, description: 'Subtarefa criada com sucesso' })
  create(@Body() dto: CreateSubtarefaDto) {
    return this.service.create(dto);
  }

  @Get()
  @ApiOperation({ summary: 'Listar todas as subtarefas' })
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  @ApiOperation({ summary: 'Obter subtarefa por ID' })
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: 'Atualizar subtarefa' })
  update(@Param('id') id: string, @Body() dto: UpdateSubtarefaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  @ApiOperation({ summary: 'Remover subtarefa por ID' })
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
