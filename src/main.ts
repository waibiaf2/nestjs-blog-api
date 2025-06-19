import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { ValidationPipe } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { config } from 'aws-sdk';
import { ConfigService } from '@nestjs/config';

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
  const swaggerConfig = new DocumentBuilder()
    .setTitle('NestJs Masterclass - Blog app API')
    .setDescription('Use base URL as http://localhost:3000/api')
    .setTermsOfService('http://localhost:3000/api/terms')
    .setLicense('MIT Licence', 'https://opensource.org/licenses/MIT')
    .addServer('http://localhost:3000')
    .addServer('http://localhost:3000/api')
    .setVersion('1.0')
    .build();
  const document = SwaggerModule.createDocument(app, swaggerConfig);
  SwaggerModule.setup('api', app, document);

  // Setting aws sdk to upload files to s3 buket on aws
  const configService = app.get(ConfigService);
  config.update({
    credentials: {
      accessKeyId: configService.get('appConfig.awsAccessKeyId') ?? '',
      secretAccessKey: configService.get('appConfig.awsAccessSecretKey') ?? '',
    },
    region: configService.get('appConfig.awsRegion'),
  });

  app.enableCors();
  await app.listen(process.env.PORT ?? 3000);
}

bootstrap();
