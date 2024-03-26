import { Address } from '@/entities/address';
import { Either, right } from '@/utils/either';
import { Apartment } from '@/entities/apartment';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { AddressRepository } from '@/repositories/address-repository';
import { PropertyRepository } from '@/repositories/property-repository';

type ICreateApartmentUseCaseResponse = Either<null, { apartment: Apartment }>

export class CreateApartmentUseCase {

	constructor(private propertyRepository: PropertyRepository<Apartment>, private addressRepository: AddressRepository) {}

	async handle({ zipCodeInfo, addressNumber, addressComplement, amenities, areaSize, builtYear, price, condominium,
		condominiumTax, description, imagesIds, ownerId, sponsorId, status, type,
		playground = false, furniture = false, gym = false, socialSpace = false,
		airConditioner = 0, balcony = 0, bathrooms = 0, bedrooms = 0, dinnerRoom = 0,
		elevator = 0, floors = 0, garage = 0, heat = 0, kitchen = 0, laundry = 0, livingRoom = 0, pool = 0
	}: ICreateApartmentUseCaseRequest): Promise<ICreateApartmentUseCaseResponse> {

		const address = Address.create({
			zipCode: zipCodeInfo.zipCode,
			number: addressNumber,
			complement: addressComplement
		});

		await this.addressRepository.create(address);
        
		const apartment = Apartment.create({
			address,
			amenities,
			areaSize,
			builtYear,
			description,
			imagesIds,
			ownerId,
			price,
			sponsorId,
			status,
			type,
			airConditioner,
			balcony,
			bathrooms,
			bedrooms,
			condominium,
			condominiumTax,
			dinnerRoom,
			elevator,
			floors,
			furniture,
			garage,
			gym,
			heat,
			kitchen,
			laundry,
			livingRoom,
			playground,
			pool,
			socialSpace
		});

		await this.propertyRepository.create(apartment);

		return right({ apartment });
	}
}

interface ICreateApartmentUseCaseRequest {
	zipCodeInfo: ZipCodeInfo
	addressNumber: string
	addressComplement: string
	amenities: number
	areaSize: number
	builtYear: number
	price: number
	condominium?: string
	condominiumTax?: number
	description: string
	imagesIds: string[]
	ownerId: string
	sponsorId: string
	status: PropertyStatus.FOR_BUY | PropertyStatus.FOR_RENT
	type: ResidentialType.APARTMENT
	playground?: boolean
	furniture?: boolean
	gym?: boolean
	socialSpace?: boolean,
	airConditioner?: number
	balcony?: number
	bathrooms?: number
	bedrooms?: number
	dinnerRoom?: number,
	elevator?: number
	floors?: number
	garage?: number
	heat?: number
	kitchen?: number
	laundry?: number
	livingRoom?: number
	pool?: number
}