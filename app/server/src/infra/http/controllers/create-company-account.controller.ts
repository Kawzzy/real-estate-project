import { z } from 'zod';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { CreateCompanyUseCase } from '@/use-cases/create-company';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';
import { CompanyAlreadyExistsError } from '@/errors/company-already-exists-error';
import { CreateZipCodeInfoInterceptor } from '../interceptors/create-zip-code-info-interceptor';
import { BadRequestException, Body, ConflictException, Controller, Post, Request, UseInterceptors } from '@nestjs/common';

const createCompanyBodySchema = z.object({
	name: z.string(),
	telephone: z.string().refine(tel => {
		const regex = /^\(\d{2}\) \d{4}-\d{4}$/;
		return regex.test(tel);
	}, {
		message: 'Invalid telephone number format. Expected format: (dd) dddd-dddd'
	}).optional(),
	cellphone: z.string().refine(phone => {
		const regex = /^\(\d{2}\) \d{3}-\d{3}-\d{3}$/;
		return regex.test(phone);
	}, {
		message: 'Invalid phone number format. Expected format: (dd) ddd-ddd-ddd'
	}),
	email: z.string().email(),
	addressNumber: z.string(),
	addressComplement: z.string().optional()
});

type CreateCompanyBodySchema = z.infer<typeof createCompanyBodySchema>

interface IRequestBody {
	zipCodeInfo: ZipCodeInfo
}

@Controller('/accounts/company')
@UseInterceptors(CreateZipCodeInfoInterceptor)
export class CreateCompanyController {
	constructor(private createCompany: CreateCompanyUseCase) {}

    @Post()
	async handle(@Body() body: CreateCompanyBodySchema, @Request() request: IRequestBody) {
		const { name, telephone, cellphone, email, addressNumber, addressComplement } = createCompanyBodySchema.parse(body);
		const { zipCodeInfo } = request;

		const result = await this.createCompany.handle({
			name,
			telephone,
			cellphone,
			email,
			zipCodeInfo,
			addressNumber,
			addressComplement,
			agentsIds: [],
			propertiesIds: []
		});

		if (result.isLeft()) {
			const error = result.value;

			switch(error.constructor) {
			case EmailAlreadyExistsError:
			case CompanyAlreadyExistsError:
				throw new ConflictException(error.message);

			default:
				throw new BadRequestException(error.message);
			}
		}
	}
}