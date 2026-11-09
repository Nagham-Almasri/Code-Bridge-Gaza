import { NestFactory } from '@nestjs/core';
import { ValidationPipe } from '@nestjs/common';
import { AppModule, ObserveInstrument } from './app.module.js';
import { NestExpressApplication } from '@nestjs/platform-express';
import { join } from 'node:path';

async function bootstrap() {
  const app = await NestFactory.create<NestExpressApplication>(AppModule, {
  instrument: ObserveInstrument,
  });

  app.useGlobalPipes(
    new ValidationPipe({
      whitelist: true,
      transform: true,
    }),
  );
app.useStaticAssets(join(process.cwd(), 'uploads'), {
  prefix: '/uploads/',
});
  const port = Number(process.env.PORT) || 5000;
  await app.listen(port, () => {
    console.log(`Application is running on port ${port}`);
  });


}
await bootstrap();