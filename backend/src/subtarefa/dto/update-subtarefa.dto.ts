import { ApiPropertyOptional } from '@nestjs/swagger';

export class UpdateSubtarefaDto {
  @ApiPropertyOptional({ example: 'Atualizar Swagger' })
  titulo?: string;

  @ApiPropertyOptional({ example: true })
  finalizada?: boolean;
}
