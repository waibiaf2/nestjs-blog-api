import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  /*Use global validation*/
  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      forbidNonWhitelisted: true,
      transform: true,
      transformOptions: {
        enableImplicitConversion: true,
      },
    }),
  );

  /*
   * Swagger Configuration
   * */
  const config = new DocumentBuilder()
    .setTitle('NestJs Masterclass - Blog app API')
    .setDescription('Use base URL as http://localhost:3000/api')
    .setTermsOfService('http://localhost:3000/api/terms')
    .setLicense('MIT Licence', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000')
    .addServer('http://localhost:3000/api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document);

  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
