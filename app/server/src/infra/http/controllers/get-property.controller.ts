import { GetPropertyUseCase } from '@/use-cases/get-property';
import { Controller, Get, NotFoundException, Param } from '@nestjs/common';

@Controller('/property')
export class GetPropertyController {
	constructor(private getProperty: GetPropertyUseCase) {}

    @Get('/:propertyId')
	async get(@Param('propertyId') propertyId: string) {
		const result = await this.getProperty.handle(propertyId);
		if (result.isLeft()) {
			throw new NotFoundException();
		}
		const { property } = result.value;
        
		return {
			property
		};
	}
}