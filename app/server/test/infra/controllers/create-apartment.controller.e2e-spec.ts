import request from 'supertest';

import { Test } from '@nestjs/testing';
import { Owner } from '@/entities/owner';
import { Contact } from '@/entities/contact';
import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create apartment (E2E)', () => {
	let app: INestApplication;
	let prismaConnection: PrismaService;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleRef.createNestApplication();

		prismaConnection = moduleRef.get(PrismaService);

		await app.init();
	});

	test('[POST] /create-apartment', async () => {
		
		const contactTest = Contact.create({
			cellphone: '(47) 992-254-980',
			email: 'usere2e@test.com',
		});

		await prismaConnection.contact.create({
			data: {
				cellphone: contactTest.cellphone,
				email: contactTest.email
			}
		});

		const contactOnDB = await prismaConnection.contact.findUnique({
			where: {
				email: 'usere2e@test.com'
			}
		});

		const ownerTest = Owner.create({
			name: 'Owner (E2E)',
			password: '12348765',
			contactId: contactOnDB.id,
			propertiesIds: [],
		});

		await prismaConnection.user.create({
			data: {
				name: ownerTest.name,
				password: ownerTest.name,
				contactId: ownerTest.contactId,
			}
		});

		const ownerOnDB = await prismaConnection.user.findFirst({
			where: {
				contact: {
					email: 'usere2e@test.com'
				}
			}
		});

		const response = await request(app.getHttpServer())
			.post('/create-apartment')
			.send({
				zipCode: '89120-000',
				addressNumber: '12',
				addressComplement: '',
				amenities: 4,
				areaSize: 50,
				builtYear: 2020,
				description: 'Cozy apartment for a young couple',
				imagesIds: [],
				ownerId: ownerOnDB.id,
				price: 1800,
				sponsorId: ownerOnDB.id,
				status: 'FOR_RENT',
				airConditioner: 1,
				balcony: 1,
				bathrooms: 2,
				bedrooms: 2,
				condominium: 'Dove home',
				condominiumTax: 200,
				dinnerRoom: 1,
				elevator: 1,
				floors: 1,
				furniture: true,
				garage: 2,
				gym: true,
				heat: 1,
				kitchen: 1,
				laundry: 1,
				livingRoom: 1,
				playground: false,
				pool: 1,
				socialSpace: true
			});
        
		expect(response.statusCode).toBe(201);

		const apartmentOnDatabase = prismaConnection.property.findFirst({
			where: {
				residentialType: 'APARTMENT'
			}
		});

		expect(apartmentOnDatabase).toBeTruthy();
	});
});