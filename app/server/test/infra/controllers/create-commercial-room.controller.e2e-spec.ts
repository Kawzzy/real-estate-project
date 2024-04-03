import request from 'supertest';

import { Test } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create commercial room (E2E)', () => {
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

	test('[POST] /create-commercial-room', async () => {

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
			.post('/create-commercial-room')
			.set('Authorization', `Bearer ${accessToken}`)
			.send({
				zipCode: '89120-000',
				addressComplement: 'Room A43',
				addressNumber: '9123',
				areaSize: '200',
				builtYear: '2021',
				description: 'Great commercial room for you business',
				imagesIds: [],
				internetAccess: true,
				office: true,
				furniture: true,
				price: '2800',
				restRoom: '4',
				securitySystem: true,
				sponsorId: owner.id,
				floors: '1',
				status: 'FOR_RENT'
			});
        
		expect(response.statusCode).toBe(201);

		const commercialRoomOnDatabase = prismaConnection.property.findFirst({
			where: {
				residentialType: 'STUDIO'
			}
		});

		expect(commercialRoomOnDatabase).toBeTruthy();
	});
});