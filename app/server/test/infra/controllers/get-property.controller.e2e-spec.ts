import request from 'supertest';

import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Get property (E2E)', () => {
	let app: INestApplication;
	let prismaConnection: PrismaService;
	let jwt: JwtService;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleRef.createNestApplication();

		prismaConnection = moduleRef.get(PrismaService);
		jwt = moduleRef.get(JwtService);

		await app.init();
	});

	test('[GET] /property/:propertyId', async () => {
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

		const accessToken = jwt.sign({ sub: owner.id });

		await request(app.getHttpServer())
			.post('/create-apartment')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				zipCode: '89120-000',
				addressNumber: '12',
				addressComplement: '',
				amenities: 4,
				areaSize: 50,
				builtYear: 2020,
				description: 'Cozy apartment for a young couple',
				imagesIds: [],
				price: 1800,
				sponsorId: owner.id,
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

		const property = await prismaConnection.property.findFirst();

		const response = await request(app.getHttpServer())
			.get(`/property/${property.id}`)
			.send();
		
		expect(response.statusCode).toBe(200);
		expect(response.body).toEqual(
			expect.objectContaining({
				property: expect.objectContaining({
					_id: property.id
				})
			})
		);
	});
});