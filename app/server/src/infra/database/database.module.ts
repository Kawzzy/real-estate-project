import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaOwnerRepository } from './prisma/repositories/prisma-owner-repository';
import { PrismaAgentRepository } from './prisma/repositories/prisma-agent-repository';
import { PrismaContactRepository } from './prisma/repositories/prisma-contact-repository';
import { PrismaCompanyRepository } from './prisma/repositories/prisma-company-repository';
import { PrismaAddressRepository } from './prisma/repositories/prisma-address-repository';
import { PrismaApartmentRepository } from './prisma/repositories/prisma-property-repository';
import { PrismaZipCodeInfoRepository } from './prisma/repositories/prisma-zip-code-info-repository';

@Module({
	providers: [
		PrismaService,
		PrismaOwnerRepository,
		PrismaAgentRepository,
		PrismaAddressRepository,
		PrismaContactRepository,
		PrismaCompanyRepository,
		PrismaApartmentRepository,
		PrismaZipCodeInfoRepository
	],
	exports: [
		PrismaService,
		PrismaOwnerRepository,
		PrismaAgentRepository,
		PrismaAddressRepository,
		PrismaContactRepository,
		PrismaCompanyRepository,
		PrismaApartmentRepository,
		PrismaZipCodeInfoRepository
	]
})
export class DatabaseModule {}