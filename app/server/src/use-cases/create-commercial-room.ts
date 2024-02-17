import { Either, right } from '@/utils/either';
import { Address } from '@/entities/value-objects/address';
import { CommercialRoom } from '@/entities/commercial-room';
import { CommercialType } from '@/entities/enums/commercial-type';
import { PropertyStatus } from '@/entities/enums/property-status';
import { PropertyRepository } from '@/repositories/property-repository';

interface ICreateCommercialRoomUseCaseRequest {
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
    furniture: boolean
}

type ICreateCommercialRoomUseCaseResponse = Either<null, { commercialRoom: CommercialRoom }>

export class CreateCommercialRoomUseCase {

	constructor(private propertyRepository: PropertyRepository<CommercialRoom>) {}

	async handle({ address, description, status, price, areaSize, floors, builtYear, imagesIds, 
		ownerId, sponsorId, office, securitySystem, internetAccess, restRoom, type, furniture
	}: ICreateCommercialRoomUseCaseRequest): Promise<ICreateCommercialRoomUseCaseResponse> {

		const commercialRoom = CommercialRoom.create({
			address,
			areaSize,
			builtYear,
			description,
			imagesIds,
			internetAccess,
			office,
			ownerId,
			price,
			restRoom,
			securitySystem,
			sponsorId,
			status,
			type,
			floors,
			furniture
		});

		this.propertyRepository.create(commercialRoom);

		return right({ commercialRoom });
	}
}