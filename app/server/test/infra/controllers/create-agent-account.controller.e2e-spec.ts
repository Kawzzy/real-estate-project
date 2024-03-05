import request from 'supertest';

import { hash } from 'bcryptjs';
import { Test } from '@nestjs/testing';
import { AppModule } from '@/app.module';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create account - Agent (E2E)', () => {
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

	test('[POST] /accounts/:companyId/agent', async () => {
		const email = 'usere2e@test.com';
		const password = '12348765';
		const hashedPassword = await hash(password, 8);

		const response = await request(app.getHttpServer())
			.post('/accounts/1/agent')
			.send({
				name: 'Agent (E2E)',
				cellphone: '(47) 992-254-980',
				email,
				password: hashedPassword
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