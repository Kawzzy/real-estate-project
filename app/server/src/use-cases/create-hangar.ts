import { Hangar } from '@/entities/hangar';
import { Address } from '@/entities/address';
import { Either, right } from '@/utils/either';
import { CommercialType } from '@/entities/enums/commercial-type';
import { PropertyStatus } from '@/entities/enums/property-status';
import { PropertyRepository } from '@/repositories/property-repository';

interface ICreateHangarUseCaseRequest {
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
    office: boolean
	securitySystem: boolean
	internetAccess: boolean
	restRoom: number
    type: CommercialType
    parkingLot: boolean
}

type ICreateHangarUseCaseResponse = Either<null, { hangar: Hangar }>

export class CreateHangarUseCase {

	constructor(private propertyRepository: PropertyRepository<Hangar>) {}

	async handle({ address, description, status, price, areaSize, floors, builtYear, imagesIds, 
		ownerId, sponsorId, office, securitySystem, internetAccess, restRoom, type, parkingLot
	}: ICreateHangarUseCaseRequest): Promise<ICreateHangarUseCaseResponse> {

		const hangar = Hangar.create({
			address,
			areaSize,
			builtYear,
			description,
			imagesIds,
			internetAccess,
			office,
			ownerId,
			parkingLot,
			price,
			restRoom,
			securitySystem,
			sponsorId,
			status,
			type,
			floors
		});

		this.propertyRepository.create(hangar);

		return right({ hangar });
	}
}