import { Studio } from '@/entities/studio';
import { Either, right } from '@/utils/either';
import { Address } from '@/entities/value-objects/address';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { PropertyRepository } from '@/repositories/property-repository';

interface ICreateStudioUseCaseRequest {
	address: Address
    description: string
	status: PropertyStatus
	price: number
	areaSize: number
	floors?: number
	builtYear: number
	imagesIds: string[]
	ownerId: string
	sponsorId: string
    condominium?: string
    condominiumTax?: number
    amenities: number
    pool?: number
    heat?: number
    airConditioner?: number
    balcony?: number
    laundry?: number
    garage?: number
    elevator?: number
    bedrooms?: number
    bathrooms?: number
    kitchen?: number
    livingRoom?: number
    dinnerRoom?: number
    playground?: boolean
    gym?: boolean
    socialSpace?: boolean
	furniture?: boolean
    type: ResidentialType
}

type ICreateStudioUseCaseResponse = Either< null, { studio: Studio }>

export class CreateStudioUseCase {

	constructor(private propertyRepository: PropertyRepository<Studio>) {}

	async handle({ address, amenities, areaSize, builtYear, price, condominium,
		condominiumTax, description, imagesIds, ownerId, sponsorId, status, type,
		playground = false, furniture = false, gym = false, socialSpace = false,
		airConditioner = 0, balcony = 0, bathrooms = 0, bedrooms = 0, dinnerRoom = 0,
		elevator = 0, floors = 0, garage = 0, heat = 0, kitchen = 0, laundry = 0, livingRoom = 0, pool = 0
	}: ICreateStudioUseCaseRequest): Promise<ICreateStudioUseCaseResponse> {

		const studio = Studio.create({
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

		await this.propertyRepository.create(studio);

		return right({ studio });
	}
}