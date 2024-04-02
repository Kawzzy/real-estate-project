import { Module } from '@nestjs/common';
import { PrismaService } from './prisma/prisma.service';
import { PrismaLoftRepository } from './prisma/repositories/prisma-loft-repository';
import { PrismaAgentRepository } from './prisma/repositories/prisma-agent-repository';
import { PrismaHouseRepository } from './prisma/repositories/prisma-house-repository';
import { PrismaOwnerRepository } from './prisma/repositories/prisma-owner-repository';
import { PrismaStudioRepository } from './prisma/repositories/prisma-studio-repository';
import { PrismaContactRepository } from './prisma/repositories/prisma-contact-repository';
import { PrismaCompanyRepository } from './prisma/repositories/prisma-company-repository';
import { PrismaAddressRepository } from './prisma/repositories/prisma-address-repository';
import { PrismaApartmentRepository } from './prisma/repositories/prisma-apartment-repository';
import { PrismaZipCodeInfoRepository } from './prisma/repositories/prisma-zip-code-info-repository';

@Module({
	providers: [
		PrismaService,
		PrismaLoftRepository,
		PrismaAgentRepository,
		PrismaHouseRepository,
		PrismaOwnerRepository,
		PrismaStudioRepository,
		PrismaAddressRepository,
		PrismaContactRepository,
		PrismaCompanyRepository,
		PrismaApartmentRepository,
		PrismaZipCodeInfoRepository
	],
	exports: [
		PrismaService,
		PrismaLoftRepository,
		PrismaAgentRepository,
		PrismaHouseRepository,
		PrismaOwnerRepository,
		PrismaStudioRepository,
		PrismaAddressRepository,
		PrismaContactRepository,
		PrismaCompanyRepository,
		PrismaApartmentRepository,
		PrismaZipCodeInfoRepository
	]
})
export class DatabaseModule {}