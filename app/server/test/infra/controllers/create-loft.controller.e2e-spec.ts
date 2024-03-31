import request from 'supertest';

import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '@/infra/app.module';
import { ResidentialType } from '@prisma/client';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create loft (E2E)', () => {
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

	test('[POST] /create-loft', async () => {

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

		const response = await request(app.getHttpServer())
			.post('/create-loft')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				zipCode: '89120-000',
				addressComplement: '',
				addressNumber: '192',
				amenities: 3,
				areaSize: 45,
				builtYear: 2023,
				description: 'Small loft',
				imagesIds: [],
				price: 2000,
				sponsorId: owner.id,
				status: 'FOR_RENT',
				type: ResidentialType.LOFT,
				airConditioner: 1,
				balcony: 0,
				bathrooms: 1,
				bedrooms: 1,
				condominium: 'Loft paradise',
				condominiumTax: 800,
				dinnerRoom: 0,
				elevator: 2,
				floors: 1,
				furniture: true,
				garage: 1,
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

		const loftOnDatabase = prismaConnection.property.findFirst({
			where: {
				residentialType: 'LOFT'
			}
		});

		expect(loftOnDatabase).toBeTruthy();
	});
});