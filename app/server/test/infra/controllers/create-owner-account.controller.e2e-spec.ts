import request from 'supertest';

import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create account - Owner (E2E)', () => {
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

	test('[POST] /accounts/owner', async () => {
		const email = 'usere2e@test.com';
		
		const response = await request(app.getHttpServer())
			.post('/accounts/owner')
			.send({
				name: 'Owner (E2E)',
				cellphone: '(47) 992-254-980',
				email,
				password: '12348765'
			});
        
		expect(response.statusCode).toBe(201);

		const userOnDatabase = await prismaConnection.user.findFirst({
			where: {
				contact: {
					email
				}
			}
		});

		expect(userOnDatabase).toBeTruthy();
	});
});