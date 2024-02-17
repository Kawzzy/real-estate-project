import { PrismaClient } from '@prisma/client';
import { Injectable, OnModuleDestroy, OnModuleInit } from '@nestjs/common';

@Injectable()
export class PrismaService extends PrismaClient implements OnModuleInit, OnModuleDestroy {
	constructor() {
		super({
			log: ['error', 'warn'],
			errorFormat: 'pretty'
		});
	}

	async onModuleInit() {
		return this.$connect();
	}
    
	async onModuleDestroy() {
		return this.$disconnect();
	}
}