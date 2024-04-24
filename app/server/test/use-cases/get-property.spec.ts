import { Address } from '@/entities/address';
import { Apartment } from '@/entities/apartment';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { GetPropertyUseCase } from '@/use-cases/get-property';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { PropertyNotFoundError } from '@/errors/property-not-found-error';
import { InMemoryApartmentRepository } from 'test/repositories/in-memory-apartment-repository';

describe('Get Property', () => {
	let inMemoryApartmentRepository: InMemoryApartmentRepository;
	let sut: GetPropertyUseCase;

	it('should return a property', async () => {
		inMemoryApartmentRepository = new InMemoryApartmentRepository();
		sut = new GetPropertyUseCase(inMemoryApartmentRepository);

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

		const apartment = Apartment.create({
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
		
		const result = await sut.handle(apartment.id);

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual(
			expect.objectContaining({
				property: expect.objectContaining({
					_id: apartment.id
				})
			})
		);
	});

	it('should not return a property', async () => {
		inMemoryApartmentRepository = new InMemoryApartmentRepository();
		sut = new GetPropertyUseCase(inMemoryApartmentRepository);

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

		const apartment = Apartment.create({
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
		
		const result = await sut.handle('random-id');

		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(PropertyNotFoundError);
	});
});