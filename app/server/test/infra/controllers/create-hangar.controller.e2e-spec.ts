import request from 'supertest';

import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create hangar (E2E)', () => {
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

	test('[POST] /create-hangar', async () => {

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
			.post('/create-hangar')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				zipCode: '89120-000',
				addressComplement: 'Industrial area',
				addressNumber: '429',
				areaSize: 3500,
				builtYear: 2016,
				description: 'Big hangar, perfect for your storage company',
				imagesIds: [],
				internetAccess: true,
				office: true,
				parkingLot: true,
				price: 1600.000,
				restRoom: 4,
				securitySystem: true,
				sponsorId: owner.id,
				floors: 1,
				status: 'FOR_BUY',
			});
        
		expect(response.statusCode).toBe(201);

		const hangarOnDatabase = prismaConnection.property.findFirst({
			where: {
				commercialType: 'HANGAR'
			}
		});

		expect(hangarOnDatabase).toBeTruthy();
	});
});