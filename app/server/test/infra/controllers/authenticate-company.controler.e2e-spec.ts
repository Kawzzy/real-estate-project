import request from 'supertest';

import { Test } from '@nestjs/testing';
import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';

describe('Authenticate Company (E2E)', () => {
	let app: INestApplication;

	beforeAll(async () => {
		const moduleRef = await Test.createTestingModule({
			imports: [AppModule]
		}).compile();

		app = moduleRef.createNestApplication();

		await app.init();
	});

	test('[POST] /company/auth', async () => {
		const email = 'company@test.com';
		const password = '129828da';

		await request(app.getHttpServer())
			.post('/accounts/company')
			.send({
				name: 'Company (E2E)',
				telephone: '(47) 3390-3242',
				cellphone: '(47) 992-786-397',
				zipCode: '89040-100',
				addressNumber: '142',
				addressComplement: 'Sala 23',
				email,
				password
			});
            
		const response = await request(app.getHttpServer())
			.post('/company/auth')
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