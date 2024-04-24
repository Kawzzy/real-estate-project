import { AuthGuard } from '@nestjs/passport';
import { UserPayload } from '@/infra/auth/sources/jwt.strategy';
import { DeletePropertyUseCase } from '@/use-cases/delete-property';
import { CurrentUser } from '@/infra/auth/sources/current-user.decorator';
import { PropertyNotFoundError } from '@/errors/property-not-found-error';
import { BadRequestException, Controller, Delete, HttpCode, Param, UnauthorizedException, UseGuards } from '@nestjs/common';

@Controller('/delete-property')
@UseGuards(AuthGuard('jwt'))
export class DeletePropertyController {
	constructor(private deleteProperty: DeletePropertyUseCase) {}

    @Delete('/:propertyId')
	@HttpCode(204)
	async handle(@CurrentUser() user: UserPayload, @Param('propertyId') propertyId: string) {
		const userId = user.sub;

		const result = await this.deleteProperty.handle(userId, propertyId);
        
		if (result.isLeft()) {
			const error = result.value;

			switch(error.constructor) {
			case PropertyNotFoundError:
				throw new PropertyNotFoundError(propertyId);

			case UnauthorizedException:
				throw new UnauthorizedException(error.message);

			default:
				throw new BadRequestException(error.message);
			}
		}
	}
}