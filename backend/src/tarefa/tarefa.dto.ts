// tarefa.dto.ts
import { ApiProperty } from '@nestjs/swagger';

export class CreateTarefaDto {
  @ApiProperty({ example: 'Estudar NestJS', description: 'Título da tarefa' })
  titulo: string;

  @ApiProperty({
    example: 'Ler a documentação oficial',
    description: 'Descrição detalhada',
  })
  descricao: string;
}

export class UpdateTarefaDto {
  @ApiProperty({ example: 'Estudar NestJS', required: false })
  titulo?: string;

  @ApiProperty({ example: 'Ler a documentação oficial', required: false })
  descricao?: string;

  @ApiProperty({ example: true, required: false })
  concluida?: boolean;
}
