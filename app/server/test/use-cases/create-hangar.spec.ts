import { describe, expect, it } from 'vitest';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { Address } from '@/entities/value-objects/address';
import { CreateHangarUseCase } from '@/use-cases/create-hangar';
import { CommercialType } from '@/entities/enums/commercial-type';
import { PropertyStatus } from '@/entities/enums/property-status';
import { InMemoryHangarRepository } from 'test/repositories/in-memory-hangar-repository';

describe('Create Hangar', () => {
    
	it('should create a Hangar', async () => {
        
		const inMemoryHangarRepository: InMemoryHangarRepository = new InMemoryHangarRepository();
		const sut: CreateHangarUseCase = new CreateHangarUseCase(inMemoryHangarRepository);

		const address = Address.create({
			complement: 'Main hangar',
			number: 8378,
			zipCodeInfo: ZipCodeInfo.create({
				zipCode: '89040-100',
				street: 'Rua XV',
				neighborhood: 'Bairro Industrial',
				city: 'Blumenau',
				state: 'SC'
			})
		});
		
		const result = await sut.handle({
			address,
			areaSize: 200,
			builtYear: 2021,
			description: 'Big hangar, perfect for your storage company',
			imagesIds: [],
			internetAccess: true,
			office: true,
			ownerId: '1',
			parkingLot: true,
			price: 1600.000,
			restRoom: 4,
			securitySystem: true,
			sponsorId: '1',
			floors: 1,
			status: PropertyStatus.FOR_BUY,
			type: CommercialType.HANGAR
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual(
			expect.objectContaining({
				hangar: expect.objectContaining({
					type: CommercialType.HANGAR
				})
			})
		);
		expect(result.value).toEqual(
			expect.objectContaining({
				hangar: expect.objectContaining({
					parkingLot: true
				})
			})
		);
		expect(inMemoryHangarRepository.hangars).toHaveLength(1);
	});
});