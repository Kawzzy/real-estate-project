import { Address } from '@/entities/address';
import { describe, expect, it } from 'vitest';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { CreateHouseUseCase } from '@/use-cases/create-house';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { InMemoryHouseRepository } from 'test/repositories/in-memory-house-repository';

describe('Create House', () => {
    
	it('should create a House', async () => {
        
		const inMemoryHouseRepository: InMemoryHouseRepository = new InMemoryHouseRepository();
		const sut: CreateHouseUseCase = new CreateHouseUseCase(inMemoryHouseRepository);

		const zipCodeInfo = ZipCodeInfo.create({
			zipCode: '89040-160',
			street: 'Rua Josef de Alencar',
			neighborhood: 'Vila',
			city: 'Blumenau',
			state: 'SC'
		});

		const address = Address.create({
			complement: '',
			number: '166',
			zipCode: zipCodeInfo.zipCode
		});
		
		const result = await sut.handle({
			address,
			amenities: 8,
			areaSize: 70,
			builtYear: 2022,
			description: 'Big house in a great neighborhood',
			imagesIds: [],
			ownerId: '1',
			sponsorId: '1',
			price: 2000,
			status: PropertyStatus.FOR_RENT,
			type: ResidentialType.HOUSE,
			backyard: true,
			deck: false,
			driveWay: true,
			frontYard: true,
			porch: false
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual(
			expect.objectContaining({
				house: expect.objectContaining({
					type: ResidentialType.HOUSE
				})
			})
		);
		expect(result.value).toEqual(
			expect.objectContaining({
				house: expect.objectContaining({
					driveWay: true
				})
			})
		);
		expect(inMemoryHouseRepository.houses).toHaveLength(1);
	});
});