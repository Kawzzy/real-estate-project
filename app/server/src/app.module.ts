import { Module } from '@nestjs/common';
import { AppService } from './app.service';
import { envSchema } from './infra/env/env';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { EnvModule } from './infra/env/env.module';
import { DatabaseModule } from './infra/database/database.module';

@Module({
	imports: [
		EnvModule,
		DatabaseModule,
		ConfigModule.forRoot({
			validate: env => envSchema.parse(env),
			isGlobal: true
		})
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
