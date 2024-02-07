import { Loft } from '@/entities/loft';
import { Address } from '@/entities/value-objects/address';
import { PropertyStatus } from '@/entities/enums/property-status';
import { ResidentialType } from '@/entities/enums/residential-type';
import { PropertyRepository } from '@/repositories/property-repository';

interface ICreateLoftUseCaseRequest {
	address: Address
	amenities: number
	areaSize: number
	builtYear: number
	price: number
	condominium: string
	condominiumTax: number
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
}

interface ICreateLoftUseCaseResponse {
    loft: Loft
}

export class CreateLoftUseCase {

	constructor(private propertyRepository: PropertyRepository<Loft>) {}

	async handle({ address, amenities, areaSize, builtYear, price, condominium,
		condominiumTax, description, imagesIds, ownerId, sponsorId, status, type,
		playground = false, furniture = false, gym = false, socialSpace = false,
		airConditioner = 0, balcony = 0, bathrooms = 0, bedrooms = 0, dinnerRoom = 0,
		elevator = 0, floors = 0, garage = 0, heat = 0, kitchen = 0, laundry = 0, livingRoom = 0, pool = 0
	}: ICreateLoftUseCaseRequest): Promise<ICreateLoftUseCaseResponse> {

		const loft = Loft.create({
			address,
			airConditioner,
			amenities,
			areaSize,
			balcony,
			bathrooms,
			bedrooms,
			builtYear,
			condominium,
			condominiumTax,
			description,
			dinnerRoom,
			elevator,
			floors,
			furniture,
			garage,
			gym,
			heat,
			imagesIds,
			kitchen,
			laundry,
			livingRoom,
			ownerId,
			playground,
			pool,
			price,
			socialSpace,
			sponsorId,
			status,
			type
		});

		await this.propertyRepository.create(loft);

		return { loft };
	}
}