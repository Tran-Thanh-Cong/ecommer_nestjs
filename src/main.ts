import { INestApplication, Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/main/app.module';
import { setupSwagger } from './shared/swagger';

async function bootstrap() {
  const app: INestApplication = await NestFactory.create(AppModule);

  //enable cors
  app.enableCors();

  //setup swagger
  setupSwagger(app);

  //port application
  const PORT = process.env.PORT;
  const logger = new Logger();

  await app.listen(PORT, () => {
    logger.log(`http://localhost:${PORT}`);
  });
}
bootstrap();
