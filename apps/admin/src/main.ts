import { NestFactory } from '@nestjs/core';
import { AppModule } from './modules/app/app.module';
import { SwaggerModule } from '@nestjs/swagger';
import helmet from 'helmet';
import { ValidationPipe } from '@nestjs/common';
import { LoggerInterceptor } from '@app/common';
import { DocumentBuilder } from '@nestjs/swagger';
import * as fs from 'fs';

async function bootstrap() {
  const httpsOptions = {
    key: fs.readFileSync('./private.key'),
    cert: fs.readFileSync('./certificate.crt'),
  };
  const app = await NestFactory.create(AppModule, { httpsOptions });

  app.setGlobalPrefix('api');
  app.use(helmet()); // https://docs.nestjs.com/security/helmet
  app.useGlobalInterceptors(new LoggerInterceptor());
  app.useGlobalPipes(new ValidationPipe({ transform: true, whitelist: true }));
  app.enableCors({
    origin: true,
    credentials: true,
  });

  const port = process.env.PORT || 3001;

  const config = new DocumentBuilder()
    .setTitle('Admin KSNet Backend')
    .addBearerAuth({
      type: 'http',
      scheme: 'bearer',
      bearerFormat: 'JWT',
      name: 'JWT',
      description: 'Enter JWT token',
      in: 'header',
    })
    .build();
  const document = SwaggerModule.createDocument(app, config);
  SwaggerModule.setup('api', app, document, {
    swaggerOptions: {
      tagsSorter: 'alpha',
      persistAuthorization: true,
      defaultModelsExpandDepth: -1,
      docExpansion: 'none',
      preloadModels: false,
      tryItOutEnabled: true,
      syntaxHighlight: true,
    },
    customSiteTitle: 'Admin KSNet Backend',
  });
  await app.listen(port);
}
bootstrap();
