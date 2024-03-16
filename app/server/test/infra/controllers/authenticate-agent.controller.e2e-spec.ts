import request from 'supertest';

import { Test } from '@nestjs/testing';
import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';

describe('Authenticate Agent (E2E)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleRef.createNestApplication();

		await app.init();
	});

	test('[POST] /agent/auth', async () => {
		const email = 'usere2e@test.com';
		const password = '12348765';

		await request(app.getHttpServer())
			.post('/accounts/1/agent')
			.send({
				name: 'Agent (E2E)',
				cellphone: '(47) 992-254-980',
				email,
				password
			});
            
		const response = await request(app.getHttpServer())
			.post('/agent/auth')
			.send({
				email,
				password
			});

		expect(response.statusCode).toBe(201);
		expect(response.body).toEqual({
			access_token: expect.any(String)
		});
	});
});