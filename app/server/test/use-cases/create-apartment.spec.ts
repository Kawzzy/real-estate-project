import { describe, it, expect } from 'vitest';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { Address } from '@/entities/value-objects/address';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { CreateApartmentUseCase } from '@/use-cases/create-apartment';
import { InMemoryApartmentRepository } from 'test/repositories/in-memory-apartment-repository';


describe('Create Apartment', () => {
    
	it('should create a Apartment', async () => {
        
		const inMemoryApartmentRepository: InMemoryApartmentRepository = new InMemoryApartmentRepository();
		const sut: CreateApartmentUseCase = new CreateApartmentUseCase(inMemoryApartmentRepository);

		const address = Address.create({
			complement: 'Block B',
			number: 402,
			zipCodeInfo: ZipCodeInfo.create({
				zipCode: '89040-100',
				street: 'Rua XV',
				neighborhood: 'Centro',
				city: 'Blumenau',
				state: 'SC'
			})
		});
		
		const { apartment } = await sut.handle({
			address,
			amenities: 5,
			areaSize: 45,
			builtYear: 2023,
			condominium: 'Residential Nature',
			condominiumTax: 200,
			description: 'Great apartment located in a great condominium close to the good areas of the city',
			imagesIds: [],
			ownerId: '1',
			sponsorId: '1',
			price: 1800,
			status: PropertyStatus.FOR_RENT,
			type: ResidentialType.APARTMENT
		});

		expect(apartment.type).toEqual(ResidentialType.APARTMENT);
		expect(inMemoryApartmentRepository.apartments).toHaveLength(1);
	});
});