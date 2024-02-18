import { CreateOwnerUseCase } from '@/use-cases/create-owner';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';
import { CreateUserBodySchema, createUserBodySchema } from '@/utils/user-utils';
import { BadRequestException, Body, ConflictException, Controller, Post } from '@nestjs/common';

@Controller('/accounts/owner')
export class CreateOwnerController {
	constructor(private createUser: CreateOwnerUseCase) {}

    @Post()
	async handle(@Body() body: CreateUserBodySchema) {
		const { name, telephone, cellphone, email } = createUserBodySchema.parse(body);
        
		const result = await this.createUser.handle({
			name,
			telephone,
			cellphone,
			email,
			propertiesIds: []
		});

		if (result.isLeft()) {
			const error = result.value;

			switch (error.constructor) {
			case EmailAlreadyExistsError:
				throw new ConflictException(error.message);
                    
			default:
				throw new BadRequestException(error.message);
			}
		}
	}
}