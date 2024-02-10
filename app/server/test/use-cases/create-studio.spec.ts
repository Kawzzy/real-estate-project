import { describe, expect, it } from 'vitest';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { Address } from '@/entities/value-objects/address';
import { CreateStudioUseCase } from '@/use-cases/create-studio';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { InMemoryStudioRepository } from 'test/repositories/in-memory-studio-repository';

describe('Create Studio', () => {
    
	it('should create a Studio', async () => {
        
		const inMemoryStudioRepository: InMemoryStudioRepository = new InMemoryStudioRepository();
		const sut: CreateStudioUseCase = new CreateStudioUseCase(inMemoryStudioRepository);

		const address = Address.create({
			complement: '',
			number: 76,
			zipCodeInfo: ZipCodeInfo.create({
				zipCode: '89040-100',
				street: 'Rua XV',
				neighborhood: 'Centro',
				city: 'Blumenau',
				state: 'SC'
			})
		});
		
		const { studio } = await sut.handle({
			address,
			amenities: 5,
			areaSize: 45,
			builtYear: 2023,
			condominium: 'Cozy Studios',
			condominiumTax: 200,
			description: 'Small and cozy studio close to the good areas of the city',
			imagesIds: [],
			ownerId: '1',
			sponsorId: '1',
			price: 1800,
			status: PropertyStatus.FOR_RENT,
			type: ResidentialType.STUDIO
		});

		expect(studio.type).toEqual(ResidentialType.STUDIO);
		expect(inMemoryStudioRepository.studios).toHaveLength(1);
	});
});