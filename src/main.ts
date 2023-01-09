import { INestApplication, Logger, ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';

import { AppModule } from './modules/app/app.module';
import { VALIDATION_PIPE_OPTIONS } from './shared/constants/pipe';
import { setupSwagger } from './shared/swagger';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  //route api
  app.setGlobalPrefix('api/v1');

  //validator pipe
  app.useGlobalPipes(new ValidationPipe(VALIDATION_PIPE_OPTIONS));

  //enable cors
  app.enableCors();

  //setup swagger
  setupSwagger(app);

  //port application
  const PORT = process.env.PORT;
  const logger = new Logger(bootstrap.name);

  await app.listen(PORT, () => {
    logger.log(`http://localhost:${PORT}`);
  });
}
bootstrap();
