import { Test, TestingModule } from '@nestjs/testing';
import { SubtarefaController } from './subtarefa.controller';

describe('SubtarefaController', () => {
  let controller: SubtarefaController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [SubtarefaController],
    }).compile();

    controller = module.get<SubtarefaController>(SubtarefaController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
