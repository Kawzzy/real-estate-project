import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { EnvModule } from '../env/env.module';
import { EnvService } from '../env/env.service';
import { PassportModule } from '@nestjs/passport';

@Module({
	imports: [
		PassportModule,
		JwtModule.registerAsync({
			imports: [EnvModule],
			inject: [EnvService],
			global: true,
			useFactory(envService: EnvService) {
				const privateKey = envService.get('JWT_PRIVATE_KEY');
				const publicKey = envService.get('JWT_PUBLIC_KEY');

				return {
					signOptions: { algorithm: 'RS256' },
					privateKey: Buffer.from(privateKey, 'base64'),
					publicKey: Buffer.from(publicKey, 'base64')
				};
			}
		})
	]
})
export class AuthModule {}