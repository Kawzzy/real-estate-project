import { describe, expect, it } from 'vitest';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { Address } from '@/entities/value-objects/address';
import { CreateHouseUseCase } from '@/use-cases/create-house';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { InMemoryHouseRepository } from 'test/repositories/in-memory-house-repository';

describe('Create House', () => {
    
	it('should create a House', async () => {
        
		const inMemoryHouseRepository: InMemoryHouseRepository = new InMemoryHouseRepository();
		const sut: CreateHouseUseCase = new CreateHouseUseCase(inMemoryHouseRepository);

		const address = Address.create({
			complement: '',
			number: 166,
			zipCodeInfo: ZipCodeInfo.create({
				zipCode: '89040-160',
				street: 'Rua Josef de Alencar',
				neighborhood: 'Vila',
				city: 'Blumenau',
				state: 'SC'
			})
		});
		
		const { house } = await sut.handle({
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

		expect(house.type).toEqual(ResidentialType.HOUSE);
		expect(house.driveWay).toBe(true);
		expect(inMemoryHouseRepository.houses).toHaveLength(1);
	});
});