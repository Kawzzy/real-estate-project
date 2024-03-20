import { z } from 'zod';
import { WrongCredentialsError } from '@/errors/wrong-credentials-error';
import { AuthenticateCompanyUseCase } from '@/use-cases/authenticate-company';
import { BadRequestException, Body, ConflictException, Controller, Post } from '@nestjs/common';

export const authCompanyBodySchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export type AuthCompanyBodySchema = z.infer<typeof authCompanyBodySchema>

@Controller('/company/auth')
export class AuthenticateCompanyController {
	constructor(private authCompanyUseCase: AuthenticateCompanyUseCase) {}

    @Post()
	async handle(@Body() body: AuthCompanyBodySchema) {
		const { email, password } = authCompanyBodySchema.parse(body);

		const result = await this.authCompanyUseCase.handle({ email, password });

		if (result.isLeft()) {
			const error = result.value;

			switch (error.constructor) {
			case WrongCredentialsError:
				throw new ConflictException(error.message);
						
			default:
				throw new BadRequestException(error.message);
			}
		}

		const { accessToken } = result.value;

		return {
			access_token: accessToken
		};
	}
}