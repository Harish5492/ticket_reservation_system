import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { INestApplication, ValidationPipe } from '@nestjs/common';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import * as cors from 'cors';
import { ConfigService } from '@nestjs/config';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';

async function bootstrap() {
  const app = await NestFactory.create(AppModule, {
    logger: ['log', 'error', 'warn'],
  });
  /** initialize confgi service to get excess all the env's local */
  const config = app.get<ConfigService>(ConfigService);
  initMiddlewares(app);
  /** Setting a Redis Hybrid Connection */
  initRedisConnection(app, config);
  initSwaggerDocs(app);
  /** set host and port of server to run it. */
  const port: number | string = config.get('SERVICE_PORT');
  await app.listen(port);
  console.log(`Server is running on http://localhost:${port}`);
}
async function initMiddlewares(app: INestApplication) {
  app.useGlobalPipes(new ValidationPipe({ transform: true }));
  // app.setGlobalPrefix('api/v1');
  app.enableCors({ origin: '*' });
  app.use(cors());
}

/**
 * @function initRedisConnection
 * @param app (INestApplication)
 * @param config (ConfigService)
 */
async function initRedisConnection(
  app: INestApplication,
  config: ConfigService,
) {
  app.connectMicroservice<MicroserviceOptions>(
    {
      transport: Transport.REDIS,
      options: {
        host: config.get('REDIS_HOST'),
        port: config.get('REDIS_PORT'),
        db: config.get('REDIS_DB'),
      },
    },
    { inheritAppConfig: true },
  );
}
async function initSwaggerDocs(app: INestApplication) {
  const config = new DocumentBuilder()
    .setTitle('User')
    .setDescription('API Documentation.')
    .setVersion('1.0')
    .addTag('Backend')
    .addServer('http://localhost:3000') // Ensure the server URL matches the actual server port
    .setLicense('MIT Licence', 'http://www.example.com')
    .setContact(
      'Harish Rana',
      'http://www.example.com',
      'harishrana5492@gmail.com',
    )
    .addBearerAuth()
    .build();

  /** creating a documentation */
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('swagger-docs', app, document);
}

bootstrap();
