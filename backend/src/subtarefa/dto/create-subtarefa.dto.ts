import { ApiProperty } from '@nestjs/swagger';

export class CreateSubtarefaDto {
  @ApiProperty({
    example: 'Revisar documentação NestJS',
    description: 'Título da subtarefa',
  })
  titulo: string;

  @ApiProperty({
    example: 'c8fa8dbf-e4ac-4a13-991f-e4703a1b6ab6',
    description: 'ID da tarefa associada',
  })
  tarefaId: string;
}
