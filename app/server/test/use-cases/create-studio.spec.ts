import { Address } from '@/entities/address';
import { describe, expect, it } from 'vitest';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { CreateStudioUseCase } from '@/use-cases/create-studio';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { InMemoryStudioRepository } from 'test/repositories/in-memory-studio-repository';
import { InMemoryAddressRepository } from 'test/repositories/in-memory-address-repository';

describe('Create Studio', () => {
    
	it('should create a Studio', async () => {
        
		const inMemoryStudioRepository: InMemoryStudioRepository = new InMemoryStudioRepository();
		const inMemoryAddressRepository: InMemoryAddressRepository = new InMemoryAddressRepository();
		const sut: CreateStudioUseCase = new CreateStudioUseCase(inMemoryStudioRepository, inMemoryAddressRepository);

		const zipCodeInfo = ZipCodeInfo.create({
			zipCode: '89040-100',
			street: 'Rua XV',
			neighborhood: 'Centro',
			city: 'Blumenau',
			state: 'SC'
		});

		const address = Address.create({
			complement: '',
			number: '76',
			zipCode: zipCodeInfo.zipCode
		});
		
		const result = await sut.handle({
			zipCodeInfo: zipCodeInfo,
			addressComplement: address.complement,
			addressNumber: address.number,
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

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual(
			expect.objectContaining({
				studio: expect.objectContaining({
					type: ResidentialType.STUDIO
				})
			})
		);
		expect(inMemoryStudioRepository.studios).toHaveLength(1);
	});
});