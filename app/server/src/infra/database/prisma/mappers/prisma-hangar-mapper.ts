import { Hangar } from '@/entities/hangar';
import { Prisma, Property, PropertyType } from '@prisma/client';
import { CommercialType } from '@/entities/enums/commercial-type';

export class PrismaHangarMapper {
	static toPrisma(hangar: Hangar): Prisma.PropertyUncheckedCreateInput {
		return {
			addressId: hangar.addressId,
			areaSize: hangar.areaSize,
			builtYear: hangar.builtYear,
			description: hangar.description,
			sponsorId: hangar.sponsorId,
			ownerId: hangar.ownerId,
			price: hangar.price,
			status: hangar.status,
			type: PropertyType.COMMERCIAL,
			floors: hangar.floors,
			furniture: hangar.furniture,
			commercialType: hangar.type,
			internetAccess: hangar.internetAccess,
			office: hangar.office,
			parkingLot: hangar.parkingLot,
			restRoom: hangar.restRoom,
			securitySystem: hangar.securitySystem
		};
	}

	static toDomain(raw: Property): Hangar {
		return Hangar.create({
			cod: raw.cod,
			addressId: raw.addressId,
			areaSize: raw.areaSize,
			builtYear: raw.builtYear,
			description: raw.description,
			sponsorId: raw.sponsorId,
			ownerId: raw.ownerId,
			price: raw.price != null ? raw.price.toNumber() : 0,
			status: null,
			type: CommercialType.HANGAR,
			floors: raw.floors,
			furniture: raw.furniture,
			updatedAt: raw.updatedAt,
			createdAt: raw.createdAt,
			imagesIds: [],
			internetAccess: raw.internetAccess,
			office: raw.office,
			parkingLot: raw.parkingLot,
			restRoom: raw.restRoom,
			securitySystem: raw.securitySystem
		});
	}
}