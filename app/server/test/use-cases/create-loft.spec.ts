import { describe, expect, it } from 'vitest';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { Address } from '@/entities/value-objects/address';
import { CreateLoftUseCase } from '@/use-cases/create-loft';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { InMemoryLoftRepository } from 'test/repositories/in-memory-loft-repository';

describe('Create Loft', () => {
    
	it('should create a Loft', async () => {
        
		const inMemoryLoftRepository: InMemoryLoftRepository = new InMemoryLoftRepository();
		const sut: CreateLoftUseCase = new CreateLoftUseCase(inMemoryLoftRepository);

		const address = Address.create({
			complement: 'Sala 23',
			number: 1432,
			zipCodeInfo: ZipCodeInfo.create({
				zipCode: '89040-100',
				street: 'Rua XV',
				neighborhood: 'Centro',
				city: 'Blumenau',
				state: 'SC'
			})
		});
		
		const { loft } = await sut.handle({
			address,
			amenities: 5,
			areaSize: 45,
			builtYear: 2023,
			condominium: 'Comfort Lofts',
			condominiumTax: 200,
			description: 'Great and comforting loft close to the good areas of the city',
			imagesIds: [],
			ownerId: '1',
			sponsorId: '1',
			price: 1800,
			status: PropertyStatus.FOR_RENT,
			type: ResidentialType.LOFT
		});

		expect(loft.type).toEqual(ResidentialType.LOFT);
		expect(inMemoryLoftRepository.lofts).toHaveLength(1);
	});
});