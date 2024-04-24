import { FetchPropertiesUseCase } from '@/use-cases/fetch-properties';
import { Controller, Get, NotFoundException, Query } from '@nestjs/common';

@Controller('/properties')
export class FetchPropertiesController {
	constructor(private fetchProperties: FetchPropertiesUseCase) {}

    @Get()
	async getAll(@Query('page') page: string) {
		
		const result = await this.fetchProperties.handle({ page: parseInt(page) });
		
		if (result.isLeft()) {
			throw new NotFoundException();
		}
		
		const { properties } = result.value;
		
		return {
			properties
		};
	}
}