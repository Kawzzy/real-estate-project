import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { CreateZipCodeInfoUseCase } from '@/use-cases/create-zipcode-info';
import { PrismaOwnerRepository } from './prisma/repositories/prisma-owner-repository';
import { PrismaAgentRepository } from './prisma/repositories/prisma-agent-repository';
import { PrismaContactRepository } from './prisma/repositories/prisma-contact-repository';
import { PrismaCompanyRepository } from './prisma/repositories/prisma-company-repository';
import { PrismaAddressRepository } from './prisma/repositories/prisma-address-repository';
import { PrismaZipCodeInfoRepository } from './prisma/repositories/prisma-zip-code-info-repository';

@Module({
	providers: [
		PrismaService,
		PrismaOwnerRepository,
		PrismaAgentRepository,
		PrismaAddressRepository,
		PrismaContactRepository,
		PrismaCompanyRepository,
		CreateZipCodeInfoUseCase,
		PrismaZipCodeInfoRepository
	],
	exports: [
		PrismaService,
		PrismaOwnerRepository,
		PrismaAgentRepository,
		PrismaAddressRepository,
		PrismaContactRepository,
		PrismaCompanyRepository,
		CreateZipCodeInfoUseCase,
		PrismaZipCodeInfoRepository
	]
})
export class DatabaseModule {}