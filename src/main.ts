import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  // app.enableCors();
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true, // Remueve propiedades no definidas en los DTOs
      forbidNonWhitelisted: true, // Lanza error si hay propiedades no permitidas
      transform: true // Convierte tipos automáticamente (por ejemplo, strings a números)
    }),
  );
  // const port = process.env.PORT
  // await app.listen(port ?? 3000);
  await app.listen(3000);
}
bootstrap();
