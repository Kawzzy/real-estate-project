import request from 'supertest';

import { Test } from '@nestjs/testing';
import { AppModule } from '@/infra/app.module';
import { INestApplication } from '@nestjs/common';
import { PrismaService } from '@/infra/database/prisma/prisma.service';

describe('Create account - Company (E2E)', () => {
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

	test('[POST] /accounts/company', async () => {
		const email = 'alles@imoveis.com';
        
		const response = await request(app.getHttpServer())
			.post('/accounts/company')
			.send({
				name: 'Alles Imóveis',
				telephone: '(47) 3390-3242',
				cellphone: '(47) 992-654-563',
				email,
				zipCode: '89040-100',
				addressNumber: '142',
				addressComplement: 'Sala 23',
				password: '23842382'
			});
        
		expect(response.statusCode).toBe(201);

		const companyOnDatabase = await prismaConnection.company.findFirst({
			where: {
				contact: {
					email
				}
			}
		});

		expect(companyOnDatabase).toBeTruthy();
	});
});