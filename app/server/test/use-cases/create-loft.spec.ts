import { Address } from '@/entities/address';
import { describe, expect, it } from 'vitest';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { CreateLoftUseCase } from '@/use-cases/create-loft';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { InMemoryLoftRepository } from 'test/repositories/in-memory-loft-repository';
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository';

describe('Create Loft', () => {
    
	it('should create a Loft', async () => {
        
		const inMemoryLoftRepository: InMemoryLoftRepository = new InMemoryLoftRepository();
		const inMemoryAddressRepository: InMemoryAddressRepository = new InMemoryAddressRepository();
		const sut: CreateLoftUseCase = new CreateLoftUseCase(inMemoryLoftRepository, inMemoryAddressRepository);

		const zipCodeInfo = ZipCodeInfo.create({
			zipCode: '89040-100',
			street: 'Rua XV',
			neighborhood: 'Centro',
			city: 'Blumenau',
			state: 'SC'
		});

		const address = Address.create({
			complement: 'Sala 23',
			number: '1432',
			zipCode: zipCodeInfo.zipCode
		});
		
		const result = await sut.handle({
			addressComplement: address.complement,
			addressNumber: address.number,
			zipCodeInfo: zipCodeInfo,
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

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual(
			expect.objectContaining({
				loft: expect.objectContaining({
					type:ResidentialType.LOFT
				})
			}));
		expect(inMemoryLoftRepository.lofts).toHaveLength(1);
	});
});