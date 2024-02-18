import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaOwnerRepository } from './prisma/repositories/prisma-owner-repository';
import { PrismaAgentRepository } from './prisma/repositories/prisma-agent-repository';
import { PrismaContactRepository } from './prisma/repositories/prisma-contact-repository';

@Module({
	providers: [
		PrismaService,
		PrismaOwnerRepository,
		PrismaAgentRepository,
		PrismaContactRepository
	],
	exports: [
		PrismaService,
		PrismaOwnerRepository,
		PrismaAgentRepository,
		PrismaContactRepository
	]
})
export class DatabaseModule {}