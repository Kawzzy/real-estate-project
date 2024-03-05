import { CreateAgentUseCase } from '@/use-cases/create-agent';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';
import { CreateUserBodySchema, createUserBodySchema } from '@/utils/user-utils';
import { BadRequestException, Body, ConflictException, Controller, Param, Post } from '@nestjs/common';

@Controller('/accounts/:companyId/agent')
export class CreateAgentController {
	constructor(private createUser: CreateAgentUseCase) {}

    @Post()
	async handle(@Body() body: CreateUserBodySchema, @Param('companyId') companyId: string) {
		const { name, telephone, cellphone, email, password } = createUserBodySchema.parse(body);
        
		const result = await this.createUser.handle({
			name,
			password,
			telephone,
			cellphone,
			email,
			companyId,
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