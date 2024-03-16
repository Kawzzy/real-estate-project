import { z } from 'zod';
import { WrongCredentialsError } from '@/errors/wrong-credentials-error';
import { AuthenticateOwnerUseCase } from '@/use-cases/authenticate-owner';
import { BadRequestException, Body, ConflictException, Controller, Post } from '@nestjs/common';

export const authUserBodySchema = z.object({
	email: z.string().email(),
	password: z.string()
});

export type AuthUserBodySchema = z.infer<typeof authUserBodySchema>

@Controller('/owner/auth')
export class AuthenticateOwnerController {
	constructor(private authOwnerUseCase: AuthenticateOwnerUseCase) {}

    @Post()
	async handle(@Body() body: AuthUserBodySchema) {
		const { email, password } = authUserBodySchema.parse(body);

		const result = await this.authOwnerUseCase.handle({ email, password });

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