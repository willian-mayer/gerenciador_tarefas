import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE'],
  });

  // ✅ Swagger config
  const config = new DocumentBuilder()
    .setTitle('Tarefas API')
    .setDescription('Documentação da API de gerenciamento de tarefas')
    .setVersion('1.0')
    .build();

  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document); // Acessível em http://localhost:3001/api

  await app.listen(process.env.PORT ?? 3001);
}
bootstrap();
