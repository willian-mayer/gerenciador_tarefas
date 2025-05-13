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

@Controller('subtasks')
export class SubtarefaController {
  constructor(private readonly service: SubtarefaService) {}

  @Post()
  create(@Body() dto: CreateSubtarefaDto) {
    return this.service.create(dto);
  }

  @Get()
  findAll() {
    return this.service.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.service.findOne(id);
  }

  @Put(':id')
  update(@Param('id') id: string, @Body() dto: UpdateSubtarefaDto) {
    return this.service.update(id, dto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.service.remove(id);
  }
}
