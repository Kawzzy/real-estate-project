import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateAgentUseCase } from '@/use-cases/create-agent';
import { CreateOwnerUseCase } from '@/use-cases/create-owner';
import { OwnerRepository } from '@/repositories/owner-repository';
import { AgentRepository } from '@/repositories/agent-repository';
import { ContactRepository } from '@/repositories/contact-repository';
import { CreateOwnerController } from './controllers/create-owner-account.controller';
import { CreateAgentController } from './controllers/create-agent-account.controller';
import { PrismaOwnerRepository } from '../database/prisma/repositories/prisma-owner-repository';
import { PrismaAgentRepository } from '../database/prisma/repositories/prisma-agent-repository';
import { PrismaContactRepository } from '../database/prisma/repositories/prisma-contact-repository';

@Module({
	imports: [DatabaseModule],
	controllers: [
		CreateOwnerController,
		CreateAgentController
	],
	providers: [
		{
			provide: CreateAgentUseCase,
			useFactory: (contactRepository: ContactRepository, agentRepository: AgentRepository) => {
				return new CreateAgentUseCase(contactRepository, agentRepository);
			},
			inject: [PrismaContactRepository, PrismaAgentRepository]
		}, {
			provide: CreateOwnerUseCase,
			useFactory: (contactRepository: ContactRepository, ownerRepository: OwnerRepository) => {
				return new CreateOwnerUseCase(contactRepository, ownerRepository);
			},
			inject: [PrismaContactRepository, PrismaOwnerRepository]
		}
	]
})
export class HttpModule {}