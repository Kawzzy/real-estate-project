import request from 'supertest';

import { Test } from '@nestjs/testing';
import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';
import { CommercialType, PropertyStatus, PropertyType, ResidentialType } from '@prisma/client';

describe('Fetch properties (E2E)', () => {
	let app: INestApplication;
	let prismaConnection: PrismaService;
	
	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleRef.createNestApplication();

		prismaConnection = moduleRef.get(PrismaService);

		await app.init();

		const contact = await prismaConnection.contact.create({
			data: {
				cellphone: '(47) 992-254-980',
				email: 'usere2e@test.com'
			}
		});

		const owner = await prismaConnection.user.create({
			data: {
				name: 'Owner (E2E)',
				password: '12348765',
				contactId: contact.id,
			}
		});

		const zipCodeInfo = await prismaConnection.zipCodeInfo.create({
			data: {
				zipCode: '01001-000',
				street: 'Praça da Sé',
				neighborhood: 'Sé',
				city: 'São Paulo',
				state: 'SP'
			}
		});

		const address = await prismaConnection.address.create({
			data: {
				complement: '',
				number: '4512',
				zipCodeInfoId: zipCodeInfo.zipCode
			}
		});
        
		// Apartments
		for (let index = 1; index <= 4; index++) {
			await prismaConnection.property.create({
				data: {
					addressId: address.id,
					amenities: 5,
					areaSize: 45,
					builtYear: 2023,
					condominium: 'Residential Nature',
					condominiumTax: 200,
					description: `Apartment ${index}`,
					ownerId: owner.id,
					sponsorId: owner.id,
					price: 1800,
					status: PropertyStatus.FOR_RENT,
					type: PropertyType.RESIDENTIAL,
					residentialType: ResidentialType.APARTMENT
				}
			});
		}
        
		// Studios
		for (let index = 1; index <= 4; index++) {
			await prismaConnection.property.create({
				data: {
					addressId: address.id,
					amenities: 5,
					areaSize: 45,
					builtYear: 2023,
					condominium: 'Cozy Studios',
					condominiumTax: 200,
					description: `Studio ${index}`,
					ownerId: owner.id,
					sponsorId: owner.id,
					price: 1800,
					status: PropertyStatus.FOR_RENT,
					type: PropertyType.RESIDENTIAL,
					residentialType: ResidentialType.STUDIO
				}
			});
		}

		// Lofts
		for (let index = 1; index <= 4; index++) {
			await prismaConnection.property.create({
				data: {
					addressId: address.id,
					amenities: 5,
					areaSize: 45,
					builtYear: 2023,
					condominium: 'Comfort Lofts',
					condominiumTax: 200,
					description: `Loft ${index}`,
					ownerId: owner.id,
					sponsorId: owner.id,
					price: 1800,
					status: PropertyStatus.FOR_RENT,
					type: PropertyType.RESIDENTIAL,
					residentialType: ResidentialType.LOFT
				}
			});
		}

		// Houses
		for (let index = 1; index <= 4; index++) {
			await prismaConnection.property.create({
				data: {
					addressId: address.id,
					amenities: 8,
					areaSize: 70,
					builtYear: 2022,
					description: `House ${index}`,
					ownerId: owner.id,
					sponsorId: owner.id,
					price: 2000,
					status: PropertyStatus.FOR_RENT,
					backyard: true,
					deck: false,
					driveWay: true,
					frontYard: true,
					porch: false,
					type: PropertyType.RESIDENTIAL,
					residentialType: ResidentialType.HOUSE
				}
			});
		}

		// Hangars
		for (let index = 1; index <= 4; index++) {
			await prismaConnection.property.create({
				data: {
					addressId: address.id,
					areaSize: 200,
					builtYear: 2021,
					description: `Hangar ${index}`,
					internetAccess: true,
					office: true,
					ownerId: owner.id,
					parkingLot: true,
					price: 1600.000,
					restRoom: 4,
					securitySystem: true,
					sponsorId: owner.id,
					floors: 1,
					status: PropertyStatus.FOR_BUY,
					type: PropertyType.COMMERCIAL,
					commercialType: CommercialType.HANGAR
				}
			});
		}

		// Commercial Rooms
		for (let index = 1; index <= 4; index++) {
			await prismaConnection.property.create({
				data: {
					addressId: address.id,
					areaSize: 200,
					builtYear: 2021,
					description: `Commercial Room ${index}`,
					internetAccess: true,
					office: true,
					ownerId: owner.id,
					furniture: true,
					price: 2800,
					restRoom: 4,
					securitySystem: true,
					sponsorId: owner.id,
					floors: 1,
					status: PropertyStatus.FOR_RENT,
					type: PropertyType.COMMERCIAL,
					commercialType: CommercialType.COMMERCIAL_ROOM
				}
			});
		}
	});

	test('[GET] /properties should return 20', async () => {

		const response = await request(app.getHttpServer())
			.get('/properties')
			.query({ page: 1 })
			.send();
		
		expect(response.statusCode).toBe(200);
		expect(response.body.properties).toHaveLength(20);
	});

	test('[GET] /properties page 2 should return 4', async () => {

		const response = await request(app.getHttpServer())
			.get('/properties')
			.query({ page: 2 })
			.send();
		
		expect(response.statusCode).toBe(200);
		expect(response.body.properties).toHaveLength(4);
	});
});