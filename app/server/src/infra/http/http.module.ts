import { Module } from '@nestjs/common';
import { DatabaseModule } from '../database/database.module';
import { CreateAgentUseCase } from '@/use-cases/create-agent';
import { CreateOwnerUseCase } from '@/use-cases/create-owner';
import { OwnerRepository } from '@/repositories/owner-repository';
import { AgentRepository } from '@/repositories/agent-repository';
import { CreateCompanyUseCase } from '@/use-cases/create-company';
import { AddressRepository } from '@/repositories/address-repository';
import { CompanyRepository } from '@/repositories/company-repository';
import { ContactRepository } from '@/repositories/contact-repository';
import { CreateZipCodeInfoUseCase } from '@/use-cases/create-zipcode-info';
import { ZipCodeInfoRepository } from '@/repositories/zipcode-info-repository';
import { CreateOwnerController } from './controllers/create-owner-account.controller';
import { CreateAgentController } from './controllers/create-agent-account.controller';
import { CreateCompanyController } from './controllers/create-company-account.controller';
import { CreateZipCodeInfoInterceptor } from './interceptors/create-zip-code-info-interceptor';
import { PrismaOwnerRepository } from '../database/prisma/repositories/prisma-owner-repository';
import { PrismaAgentRepository } from '../database/prisma/repositories/prisma-agent-repository';
import { PrismaAddressRepository } from '../database/prisma/repositories/prisma-address-repository';
import { PrismaCompanyRepository } from '../database/prisma/repositories/prisma-company-repository';
import { PrismaContactRepository } from '../database/prisma/repositories/prisma-contact-repository';
import { PrismaZipCodeInfoRepository } from '../database/prisma/repositories/prisma-zip-code-info-repository';

@Module({
	imports: [DatabaseModule],
	controllers: [
		CreateOwnerController,
		CreateAgentController,
		CreateCompanyController
	],
	providers: [
		CreateZipCodeInfoInterceptor,
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
		}, {
			provide: CreateCompanyUseCase,
			useFactory: (companyRepository: CompanyRepository, contactRepository: ContactRepository, addressRepository: AddressRepository) => {
				return new CreateCompanyUseCase(companyRepository, contactRepository, addressRepository);
			},
			inject: [PrismaCompanyRepository, PrismaContactRepository, PrismaAddressRepository]
		}, {
			provide: CreateZipCodeInfoUseCase,
			useFactory: (zipCodeInfoRepository: ZipCodeInfoRepository) => {
				return new CreateZipCodeInfoUseCase(zipCodeInfoRepository);
			},
			inject: [PrismaZipCodeInfoRepository]
		}
	]
})
export class HttpModule {}