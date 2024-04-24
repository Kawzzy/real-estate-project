import { Address } from '@/entities/address';
import { Apartment } from '@/entities/apartment';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { PropertyStatus } from '@/entities/enums/property-status';
import { DeletePropertyUseCase } from '@/use-cases/delete-property';
import { ResidentialType } from '@/entities/enums/residential-type';
import { PropertyNotFoundError } from '@/errors/property-not-found-error';
import { InMemoryApartmentRepository } from 'test/repositories/in-memory-apartment-repository';

describe('Delete Property', () => {
	let inMemoryApartmentRepository: InMemoryApartmentRepository;
	let sut: DeletePropertyUseCase;
	let apartment: Apartment;

	beforeEach(() => {
		inMemoryApartmentRepository = new InMemoryApartmentRepository();
		sut = new DeletePropertyUseCase(inMemoryApartmentRepository);

		const zipCodeInfo = ZipCodeInfo.create({
			zipCode: '89040-100',
			street: 'Rua XV',
			neighborhood: 'Centro',
			city: 'Blumenau',
			state: 'SC'
		});
		
		const address = Address.create({
			complement: 'Block B',
			number: '402',
			zipCode: zipCodeInfo.zipCode
		});

		apartment = Apartment.create({
			addressId: address.id,
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

		inMemoryApartmentRepository.apartments.push(apartment);
	});

	afterEach(() => {
		inMemoryApartmentRepository.apartments = [];
	});

	it('should delete a property', async () => {
		
		expect(inMemoryApartmentRepository.apartments).toHaveLength(1);
        
		const result = await sut.handle('1', apartment.id);
        
		expect(result.isRight()).toBe(true);
		expect(result.value).toBe(null);
		expect(inMemoryApartmentRepository.apartments).empty;
	});

	it('should return not found error', async () => {
		
		expect(inMemoryApartmentRepository.apartments).toHaveLength(1);
		
		const result = await sut.handle('1', 'random-id');
        
		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(PropertyNotFoundError);
		expect(inMemoryApartmentRepository.apartments).toHaveLength(1); 
	});
});