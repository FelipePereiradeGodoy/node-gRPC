import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import { join } from 'path';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.GRPC,
    options: {
      package: 'category',
      protoPath: join(__dirname, 'protos/category.proto'),
      url: 'localhost:50001'
    }
  });

  await app.startAllMicroservices();
  //await app.listen();
}
bootstrap();
