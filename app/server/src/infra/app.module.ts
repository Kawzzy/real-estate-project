import { Module } from '@nestjs/common';
import { envSchema } from './env/sources/env';
import { ConfigModule } from '@nestjs/config';
import { EnvModule } from './env/env.module';
import { HttpModule } from './http/http.module';
import { AuthModule } from './auth/auth.module';

@Module({
	imports: [
		EnvModule,
		AuthModule,
		HttpModule,
		ConfigModule.forRoot({
			validate: env => envSchema.parse(env),
			isGlobal: true
		})
	]
})
export class AppModule {}
