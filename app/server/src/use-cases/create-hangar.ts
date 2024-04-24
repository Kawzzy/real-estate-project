import { Hangar } from '@/entities/hangar';
import { Address } from '@/entities/address';
import { Either, right } from '@/utils/either';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { CommercialType } from '@/entities/enums/commercial-type';
import { PropertyStatus } from '@/entities/enums/property-status';
import { AddressRepository } from '@/repositories/address-repository';
import { PropertyRepository } from '@/repositories/property-repository';

type ICreateHangarUseCaseResponse = Either<null, { hangar: Hangar }>

export class CreateHangarUseCase {

	constructor(private propertyRepository: PropertyRepository<Hangar>, private addressRepository: AddressRepository) {}

	async handle({ zipCodeInfo, addressComplement, addressNumber, description, status, price, areaSize, floors,
		builtYear, imagesIds, ownerId, sponsorId, office, securitySystem, internetAccess, restRoom, type, parkingLot
	}: ICreateHangarUseCaseRequest): Promise<ICreateHangarUseCaseResponse> {

		const address = Address.create({
			zipCode: zipCodeInfo.zipCode,
			number: addressNumber,
			complement: addressComplement
		});

		await this.addressRepository.create(address);
		
		const hangar = Hangar.create({
			addressId: address.id,
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

interface ICreateHangarUseCaseRequest {
	zipCodeInfo: ZipCodeInfo
	addressComplement: string
	addressNumber: string
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
    type: CommercialType.HANGAR
    parkingLot: boolean
}