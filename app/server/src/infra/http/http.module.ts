import { Loft } from '@/entities/loft';
import { Module } from '@nestjs/common';
import { House } from '@/entities/house';
import { Hangar } from '@/entities/hangar';
import { Studio } from '@/entities/studio';
import { Apartment } from '@/entities/apartment';
import { Encrypter } from '@/cryptography/encrypter';
import { CommercialRoom } from '@/entities/commercial-room';
import { CreateLoftUseCase } from '@/use-cases/create-loft';
import { HashComparer } from '@/cryptography/hash-comparer';
import { DatabaseModule } from '../database/database.module';
import { CreateAgentUseCase } from '@/use-cases/create-agent';
import { CreateHouseUseCase } from '@/use-cases/create-house';
import { CreateOwnerUseCase } from '@/use-cases/create-owner';
import { HashGenerator } from '@/cryptography/hash-generator';
import { CreateHangarUseCase } from '@/use-cases/create-hangar';
import { CreateStudioUseCase } from '@/use-cases/create-studio';
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
import { CreateLoftController } from './controllers/create-loft.controller';
import { AuthenticateCompanyUseCase } from '@/use-cases/authenticate-company';
import { CreateHouseController } from './controllers/create-house.controller';
import { ZipCodeInfoRepository } from '@/repositories/zipcode-info-repository';
import { CreateHangarController } from './controllers/create-hangar.controller';
import { CreateStudioController } from './controllers/create-studio.controller';
import { CreateCommercialRoomUseCase } from '@/use-cases/create-commercial-room';
import { CreateAgentController } from './controllers/create-agent-account.controller';
import { CreateApartmentController } from './controllers/create-apartment.controller';
import { CreateOwnerController } from './controllers/create-owner-account.controller';
import { AuthenticateAgentController } from './controllers/authenticate-agent.controller';
import { AuthenticateOwnerController } from './controllers/authenticate-owner.controller';
import { CreateCompanyController } from './controllers/create-company-account.controller';
import { AuthenticateCompanyController } from './controllers/authenticate-company.controller';
import { PrismaLoftRepository } from '../database/prisma/repositories/prisma-loft-repository';
import { CreateZipCodeInfoInterceptor } from './interceptors/create-zip-code-info-interceptor';
import { PrismaAgentRepository } from '../database/prisma/repositories/prisma-agent-repository';
import { PrismaHouseRepository } from '../database/prisma/repositories/prisma-house-repository';
import { PrismaOwnerRepository } from '../database/prisma/repositories/prisma-owner-repository';
import { CreateCommercialRoomController } from './controllers/create-commercial-room.controller';
import { PrismaHangarRepository } from '../database/prisma/repositories/prisma-hangar-repository';
import { PrismaStudioRepository } from '../database/prisma/repositories/prisma-studio-repository';
import { PrismaAddressRepository } from '../database/prisma/repositories/prisma-address-repository';
import { PrismaCompanyRepository } from '../database/prisma/repositories/prisma-company-repository';
import { PrismaContactRepository } from '../database/prisma/repositories/prisma-contact-repository';
import { PrismaApartmentRepository } from '../database/prisma/repositories/prisma-apartment-repository';
import { PrismaZipCodeInfoRepository } from '../database/prisma/repositories/prisma-zip-code-info-repository';
import { PrismaCommercialRoomRepository } from '../database/prisma/repositories/prisma-commercial-room-repository';

@Module({
	imports: [
		DatabaseModule,
		CryptographyModule
	],
	controllers: [
		CreateLoftController,
		CreateAgentController,
		CreateHouseController,
		CreateOwnerController,
		CreateHangarController,
		CreateStudioController,
		CreateCompanyController,
		CreateApartmentController,
		AuthenticateAgentController,
		AuthenticateOwnerController,
		AuthenticateCompanyController,
		CreateCommercialRoomController
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
		}, {
			provide: CreateLoftUseCase,
			useFactory: (propertyRepository: PropertyRepository<Loft>, addressRepository: AddressRepository) => {
				return new CreateLoftUseCase(propertyRepository, addressRepository);
			},
			inject: [PrismaLoftRepository, PrismaAddressRepository]
		}, {
			provide: CreateStudioUseCase,
			useFactory: (propertyRepository: PropertyRepository<Studio>, addressRepository: AddressRepository) => {
				return new CreateStudioUseCase(propertyRepository, addressRepository);
			},
			inject: [PrismaStudioRepository, PrismaAddressRepository]
		}, {
			provide: CreateHouseUseCase,
			useFactory: (propertyRepository: PropertyRepository<House>, addressRepository: AddressRepository) => {
				return new CreateHouseUseCase(propertyRepository, addressRepository);
			},
			inject: [PrismaHouseRepository, PrismaAddressRepository]
		}, {
			provide: CreateCommercialRoomUseCase,
			useFactory: (propertyRepository: PropertyRepository<CommercialRoom>, addressRepository: AddressRepository) => {
				return new CreateCommercialRoomUseCase(propertyRepository, addressRepository);
			},
			inject: [PrismaCommercialRoomRepository, PrismaAddressRepository]
		}, {
			provide: CreateHangarUseCase,
			useFactory: (propertyRepository: PropertyRepository<Hangar>, addressRepository: AddressRepository) => {
				return new CreateHangarUseCase(propertyRepository, addressRepository);
			},
			inject: [PrismaHangarRepository, PrismaAddressRepository]
		}
	]
})
export class HttpModule {}