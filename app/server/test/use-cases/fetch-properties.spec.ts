import { Loft } from '@/entities/loft';
import { House } from '@/entities/house';
import { Hangar } from '@/entities/hangar';
import { Studio } from '@/entities/studio';
import { Address } from '@/entities/address';
import { Apartment } from '@/entities/apartment';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { CommercialRoom } from '@/entities/commercial-room';
import { CommercialType } from '@/entities/enums/commercial-type';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { FetchPropertiesUseCase } from '@/use-cases/fetch-properties';
import { InMemoryLoftRepository } from 'test/repositories/in-memory-loft-repository';
import { InMemoryHouseRepository } from 'test/repositories/in-memory-house-repository';
import { InMemoryHangarRepository } from 'test/repositories/in-memory-hangar-repository';
import { InMemoryStudioRepository } from 'test/repositories/in-memory-studio-repository';
import { InMemoryApartmentRepository } from 'test/repositories/in-memory-apartment-repository';
import { InMemoryCommercialRoomRepository } from 'test/repositories/in-memory-commercial-room-repository';

describe('Fetch Properties', () => {
	let inMemoryApartmentRepository: InMemoryApartmentRepository;
	let inMemoryStudioRepository: InMemoryStudioRepository;
	let inMemoryLoftRepository: InMemoryLoftRepository;
	let inMemoryHouseRepository: InMemoryHouseRepository;
	let inMemoryHangarRepository: InMemoryHangarRepository;
	let inMemoryCommercialRoomRepository: InMemoryCommercialRoomRepository;
	let sut: FetchPropertiesUseCase;
	let address: Address;

	beforeEach(() => {
		inMemoryApartmentRepository = new InMemoryApartmentRepository();
		inMemoryStudioRepository = new InMemoryStudioRepository();
		inMemoryLoftRepository = new InMemoryLoftRepository();
		inMemoryHouseRepository = new InMemoryHouseRepository();
		inMemoryHangarRepository = new InMemoryHangarRepository();
		inMemoryCommercialRoomRepository = new InMemoryCommercialRoomRepository();

		sut = new FetchPropertiesUseCase(inMemoryApartmentRepository, inMemoryStudioRepository, inMemoryLoftRepository,
			inMemoryHouseRepository, inMemoryHangarRepository, inMemoryCommercialRoomRepository);
        
		const zipCodeInfo = ZipCodeInfo.create({
			zipCode: '89040-100',
			street: 'Rua XV',
			neighborhood: 'Centro',
			city: 'Blumenau',
			state: 'SC'
		});
		
		address = Address.create({
			complement: 'Block B',
			number: '402',
			zipCode: zipCodeInfo.zipCode
		});
	});

	it('should return all the properties', async () => {

		createProperties(address, inMemoryApartmentRepository, inMemoryStudioRepository, inMemoryLoftRepository,
			inMemoryHouseRepository, inMemoryHangarRepository, inMemoryCommercialRoomRepository);
        
		const result = await sut.handle({ page: 1 });

		expect(result.isRight()).toBe(true);
		expect(result.value.properties).toHaveLength(20);
	});

	it('should return 4 properties from page 2', async () => {

		createProperties(address, inMemoryApartmentRepository, inMemoryStudioRepository, inMemoryLoftRepository,
			inMemoryHouseRepository, inMemoryHangarRepository, inMemoryCommercialRoomRepository);
        
		const result = await sut.handle({ page: 2 });

		expect(result.isRight()).toBe(true);
		expect(result.value.properties).toHaveLength(4);
	});
});

function createProperties(address: Address, inMemoryApartmentRepository: InMemoryApartmentRepository, inMemoryStudioRepository: InMemoryStudioRepository,
	inMemoryLoftRepository: InMemoryLoftRepository, inMemoryHouseRepository: InMemoryHouseRepository, inMemoryHangarRepository: InMemoryHangarRepository,
	inMemoryCommercialRoomRepository: InMemoryCommercialRoomRepository) {

	for (let index = 1; index <= 4; index++) {
		inMemoryApartmentRepository.apartments.push(Apartment.create({
			addressId: address.id,
			amenities: 5,
			areaSize: 45,
			builtYear: 2023,
			condominium: 'Residential Nature',
			condominiumTax: 200,
			description: `Apartment ${index}`,
			imagesIds: [],
			ownerId: '1',
			sponsorId: '1',
			price: 1800,
			status: PropertyStatus.FOR_RENT,
			type: ResidentialType.APARTMENT
		}));
	}
	
	for (let index = 1; index <= 4; index++) {
		inMemoryStudioRepository.studios.push(Studio.create({
			addressId: address.id,
			amenities: 5,
			areaSize: 45,
			builtYear: 2023,
			condominium: 'Cozy Studios',
			condominiumTax: 200,
			description: `Studio ${index}`,
			imagesIds: [],
			ownerId: '1',
			sponsorId: '1',
			price: 1800,
			status: PropertyStatus.FOR_RENT,
			type: ResidentialType.STUDIO
		}));
	}

	for (let index = 1; index <= 4; index++) {
		inMemoryLoftRepository.lofts.push(Loft.create({
			addressId: address.id,
			amenities: 5,
			areaSize: 45,
			builtYear: 2023,
			condominium: 'Comfort Lofts',
			condominiumTax: 200,
			description: `Loft ${index}`,
			imagesIds: [],
			ownerId: '1',
			sponsorId: '1',
			price: 1800,
			status: PropertyStatus.FOR_RENT,
			type: ResidentialType.LOFT
		}));
	}

	for (let index = 1; index <= 4; index++) {
		inMemoryHouseRepository.houses.push(House.create({
			addressId: address.id,
			amenities: 8,
			areaSize: 70,
			builtYear: 2022,
			description: `House ${index}`,
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
		}));
	}

	for (let index = 1; index <= 4; index++) {
		inMemoryHangarRepository.hangars.push(Hangar.create({
			addressId: address.id,
			areaSize: 200,
			builtYear: 2021,
			description: `Hangar ${index}`,
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
		}));
	}

	for (let index = 1; index <= 4; index++) {
		inMemoryCommercialRoomRepository.commercialRooms.push(CommercialRoom.create({
			addressId: address.id,
			areaSize: 200,
			builtYear: 2021,
			description: `Commercial Room ${index}`,
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
		}));
	}
}