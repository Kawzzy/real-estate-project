import request from 'supertest';

import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create house (E2E)', () => {
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

	test('[POST] /create-house', async () => {

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
			.post('/create-house')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				zipCode: '89120-000',
				addressComplement: 'Brodwood way',
				addressNumber: '938',
				amenities: 3,
				areaSize: 45,
				builtYear: 2022,
				description: 'Nice house close to the lake',
				imagesIds: [],
				price: 2000,
				sponsorId: owner.id,
				status: 'FOR_BUY',
				airConditioner: 1,
				balcony: 0,
				bathrooms: 1,
				bedrooms: 1,
				condominium: 'Decent house for a small family',
				condominiumTax: 800,
				dinnerRoom: 0,
				elevator: 2,
				floors: 2,
				furniture: true,
				garage: 1,
				gym: true,
				heat: 1,
				kitchen: 1,
				laundry: 1,
				livingRoom: 1,
				playground: false,
				pool: 1,
				socialSpace: true,
				deck: true,
				porch: false,
				backyard: true,
				driveWay: true,
				frontYard: true
			});
        
		expect(response.statusCode).toBe(201);

		const houseOnDatabase = prismaConnection.property.findFirst({
			where: {
				residentialType: 'STUDIO'
			}
		});

		expect(houseOnDatabase).toBeTruthy();
	});
});