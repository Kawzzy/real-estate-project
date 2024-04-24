import { Address } from '@/entities/address';
import { Either, right } from '@/utils/either';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { CommercialRoom } from '@/entities/commercial-room';
import { CommercialType } from '@/entities/enums/commercial-type';
import { PropertyStatus } from '@/entities/enums/property-status';
import { AddressRepository } from '@/repositories/address-repository';
import { PropertyRepository } from '@/repositories/property-repository';

type ICreateCommercialRoomUseCaseResponse = Either<null, { commercialRoom: CommercialRoom }>

export class CreateCommercialRoomUseCase {

	constructor(private propertyRepository: PropertyRepository<CommercialRoom>, private addressRepository: AddressRepository) {}

	async handle({ zipCodeInfo, addressComplement, addressNumber, description, status, price, areaSize, floors,
		builtYear, imagesIds, ownerId, sponsorId, office, securitySystem, internetAccess, restRoom, type, furniture
	}: ICreateCommercialRoomUseCaseRequest): Promise<ICreateCommercialRoomUseCaseResponse> {

		const address = Address.create({
			zipCode: zipCodeInfo.zipCode,
			number: addressNumber,
			complement: addressComplement
		});

		await this.addressRepository.create(address);
		
		const commercialRoom = CommercialRoom.create({
			addressId: address.id,
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

interface ICreateCommercialRoomUseCaseRequest {
	zipCodeInfo: ZipCodeInfo
	addressNumber: string
	addressComplement: string
    description: string
	status: PropertyStatus.FOR_BUY | PropertyStatus.FOR_RENT
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
    type: CommercialType.COMMERCIAL_ROOM
    furniture: boolean
}