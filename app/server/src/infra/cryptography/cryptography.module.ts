import { Module } from '@nestjs/common';
import { BcryptHasher } from './sources/bcrypt-hasher';
import { JwtEncrypter } from './sources/jwt-encrypter';

@Module({
	providers: [
		BcryptHasher,
		JwtEncrypter
	],
	exports: [
		BcryptHasher,
		JwtEncrypter
	]
})
export class CryptographyModule {}