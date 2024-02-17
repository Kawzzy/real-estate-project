import { describe, expect, it } from 'vitest';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { Address } from '@/entities/value-objects/address';
import { CommercialType } from '@/entities/enums/commercial-type';
import { PropertyStatus } from '@/entities/enums/property-status';
import { CreateCommercialRoomUseCase } from '@/use-cases/create-commercial-room';
import { InMemoryCommercialRoomRepository } from 'test/repositories/in-memory-commercial-room-repository';

describe('Create CommercialRoom', () => {
    
	it('should create a CommercialRoom', async () => {
        
		const inMemoryCommercialRoomRepository: InMemoryCommercialRoomRepository = new InMemoryCommercialRoomRepository();
		const sut: CreateCommercialRoomUseCase = new CreateCommercialRoomUseCase(inMemoryCommercialRoomRepository);

		const address = Address.create({
			complement: 'Main hangar',
			number: 8378,
			zipCodeInfo: ZipCodeInfo.create({
				zipCode: '89040-100',
				street: 'Rua XV',
				neighborhood: 'Bairro Comercial',
				city: 'Blumenau',
				state: 'SC'
			})
		});
		
		const result = await sut.handle({
			address,
			areaSize: 200,
			builtYear: 2021,
			description: 'Great commercial room for you business',
			imagesIds: [],
			internetAccess: true,
			office: true,
			ownerId: '1',
			furniture: true,
			price: 2800,
			restRoom: 4,
			securitySystem: true,
			sponsorId: '1',
			floors: 1,
			status: PropertyStatus.FOR_RENT,
			type: CommercialType.COMMERCIAL_ROOM
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual(
			expect.objectContaining({
				commercialRoom: expect.objectContaining({
					type: CommercialType.COMMERCIAL_ROOM
				})
			})
		);
		expect(result.value).toEqual(
			expect.objectContaining({
				commercialRoom: expect.objectContaining({
					furniture: true
				})
			})
		);
		expect(inMemoryCommercialRoomRepository.commercialRooms).toHaveLength(1);
	});
});