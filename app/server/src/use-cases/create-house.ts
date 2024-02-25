import { House } from '@/entities/house';
import { Address } from '@/entities/address';
import { Either, right } from '@/utils/either';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { PropertyRepository } from '@/repositories/property-repository';

interface ICreateHouseUseCaseRequest {
    address: Address
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
	status: PropertyStatus
	type: ResidentialType
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
    deck: boolean
    porch: boolean
    backyard: boolean
    driveWay: boolean
    frontYard: boolean
}

type ICreateHouseUseCaseResponse = Either<null, { house: House }>

export class CreateHouseUseCase {

	constructor(private propertyRepository: PropertyRepository<House>) {}

	async handle({ address, amenities, areaSize, builtYear, price, condominium,
		condominiumTax, description, imagesIds, ownerId, sponsorId, status, type,
		playground = false, furniture = false, gym = false, socialSpace = false,
		airConditioner = 0, balcony = 0, bathrooms = 0, bedrooms = 0, dinnerRoom = 0,
		elevator = 0, floors = 0, garage = 0, heat = 0, kitchen = 0, laundry = 0, livingRoom = 0, pool = 0,
		deck = false, porch = false, backyard = false, driveWay = false, frontYard = false
	}: ICreateHouseUseCaseRequest): Promise<ICreateHouseUseCaseResponse> {

		const house = House.create({
			address,
			amenities,
			areaSize,
			backyard,
			builtYear,
			condominium,
			condominiumTax,
			deck,
			description,
			driveWay,
			frontYard,
			imagesIds,
			ownerId,
			porch,
			price,
			sponsorId,
			status,
			type,
			airConditioner,
			balcony,
			bathrooms,
			bedrooms,
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

		await this.propertyRepository.create(house);

		return right({ house });
	}
}