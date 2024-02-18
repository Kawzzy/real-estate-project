import { Module } from '@nestjs/common';
import { envSchema } from './infra/env/env';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './infra/env/env.module';
import { HttpModule } from './infra/http/http.module';

@Module({
	imports: [
		EnvModule,
		HttpModule,
		ConfigModule.forRoot({
			validate: env => envSchema.parse(env),
			isGlobal: true
		})
	]
})
export class AppModule {}
