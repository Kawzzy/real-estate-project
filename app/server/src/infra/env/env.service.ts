import { Env } from './sources/env';
import { Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';

/**
 * Service that returns the env. variable's value.
 */
@Injectable()
export class EnvService {
	constructor(private configService: ConfigService<Env, true>) {}

	get<T extends keyof Env>(key: T) {
		return this.configService.get(key, { infer: true });
	}
}