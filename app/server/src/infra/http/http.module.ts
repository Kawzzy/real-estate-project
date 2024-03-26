import { Module } from '@nestjs/common';
import { Apartment } from '@/entities/apartment';
import { Encrypter } from '@/cryptography/encrypter';
import { HashComparer } from '@/cryptography/hash-comparer';
import { DatabaseModule } from '../database/database.module';
import { CreateAgentUseCase } from '@/use-cases/create-agent';
import { CreateOwnerUseCase } from '@/use-cases/create-owner';
import { HashGenerator } from '@/cryptography/hash-generator';
import { AgentRepository } from '@/repositories/agent-repository';
import { CreateCompanyUseCase } from '@/use-cases/create-company';
import { OwnerRepository } from '@/repositories/owner-repository';
import { BcryptHasher } from '../cryptography/sources/bcrypt-hasher';
import { JwtEncrypter } from '../cryptography/sources/jwt-encrypter';
import { AddressRepository } from '@/repositories/address-repository';
import { CompanyRepository } from '@/repositories/company-repository';
import { ContactRepository } from '@/repositories/contact-repository';
import { CreateApartmentUseCase } from '@/use-cases/create-apartment';
import { PropertyRepository } from '@/repositories/property-repository';
import { CryptographyModule } from '../cryptography/cryptography.module';
import { AuthenticateAgentUseCase } from '@/use-cases/authenticate-agent';
import { AuthenticateOwnerUseCase } from '@/use-cases/authenticate-owner';
import { CreateZipCodeInfoUseCase } from '@/use-cases/create-zipcode-info';
import { AuthenticateCompanyUseCase } from '@/use-cases/authenticate-company';
import { ZipCodeInfoRepository } from '@/repositories/zipcode-info-repository';
import { CreateAgentController } from './controllers/create-agent-account.controller';
import { CreateApartmentController } from './controllers/create-apartment.controller';
import { CreateOwnerController } from './controllers/create-owner-account.controller';
import { AuthenticateAgentController } from './controllers/authenticate-agent.controller';
import { AuthenticateOwnerController } from './controllers/authenticate-owner.controller';
import { CreateCompanyController } from './controllers/create-company-account.controller';
import { AuthenticateCompanyController } from './controllers/authenticate-company.controller';
import { CreateZipCodeInfoInterceptor } from './interceptors/create-zip-code-info-interceptor';
import { PrismaOwnerRepository } from '../database/prisma/repositories/prisma-owner-repository';
import { PrismaAgentRepository } from '../database/prisma/repositories/prisma-agent-repository';
import { PrismaAddressRepository } from '../database/prisma/repositories/prisma-address-repository';
import { PrismaCompanyRepository } from '../database/prisma/repositories/prisma-company-repository';
import { PrismaContactRepository } from '../database/prisma/repositories/prisma-contact-repository';
import { PrismaApartmentRepository } from '../database/prisma/repositories/prisma-property-repository';
import { PrismaZipCodeInfoRepository } from '../database/prisma/repositories/prisma-zip-code-info-repository';

@Module({
	imports: [
		DatabaseModule,
		CryptographyModule
	],
	controllers: [
		CreateOwnerController,
		CreateAgentController,
		CreateCompanyController,
		CreateApartmentController,
		AuthenticateAgentController,
		AuthenticateOwnerController,
		AuthenticateCompanyController
	],
	providers: [
		CreateZipCodeInfoInterceptor,
		{
			provide: CreateAgentUseCase,
			useFactory: (contactRepository: ContactRepository, agentRepository: AgentRepository, hashGenerator: HashGenerator) => {
				return new CreateAgentUseCase(contactRepository, agentRepository, hashGenerator);
			},
			inject: [PrismaContactRepository, PrismaAgentRepository, BcryptHasher]
		}, {
			provide: CreateOwnerUseCase,
			useFactory: (contactRepository: ContactRepository, ownerRepository: OwnerRepository, hashGenerator: HashGenerator) => {
				return new CreateOwnerUseCase(contactRepository, ownerRepository, hashGenerator);
			},
			inject: [PrismaContactRepository, PrismaOwnerRepository, BcryptHasher]
		}, {
			provide: CreateCompanyUseCase,
			useFactory: (companyRepository: CompanyRepository, contactRepository: ContactRepository, addressRepository: AddressRepository, hashGenerator: HashGenerator) => {
				return new CreateCompanyUseCase(companyRepository, contactRepository, addressRepository, hashGenerator);
			},
			inject: [PrismaCompanyRepository, PrismaContactRepository, PrismaAddressRepository, BcryptHasher]
		}, {
			provide: CreateZipCodeInfoUseCase,
			useFactory: (zipCodeInfoRepository: ZipCodeInfoRepository) => {
				return new CreateZipCodeInfoUseCase(zipCodeInfoRepository);
			},
			inject: [PrismaZipCodeInfoRepository]
		}, {
			provide: AuthenticateAgentUseCase,
			useFactory: (agentRepository: AgentRepository, hashComparer: HashComparer, encryper: Encrypter) => {
				return new AuthenticateAgentUseCase(agentRepository, hashComparer, encryper);
			},
			inject: [PrismaAgentRepository, BcryptHasher, JwtEncrypter]
		}, {
			provide: AuthenticateOwnerUseCase,
			useFactory: (ownerRepository: OwnerRepository, hashComparer: HashComparer, encryper: Encrypter) => {
				return new AuthenticateOwnerUseCase(ownerRepository, hashComparer, encryper);
			},
			inject: [PrismaOwnerRepository, BcryptHasher, JwtEncrypter]
		}, {
			provide: AuthenticateCompanyUseCase,
			useFactory: (companyRepository: CompanyRepository, hashComparer: HashComparer, encryper: Encrypter) => {
				return new AuthenticateCompanyUseCase(companyRepository, hashComparer, encryper);
			},
			inject: [PrismaCompanyRepository, BcryptHasher, JwtEncrypter]
		}, {
			provide: CreateApartmentUseCase,
			useFactory: (propertyRepository: PropertyRepository<Apartment>, addressRepository: AddressRepository) => {
				return new CreateApartmentUseCase(propertyRepository, addressRepository);
			},
			inject: [PrismaApartmentRepository, PrismaAddressRepository]
		}
	]
})
export class HttpModule {}