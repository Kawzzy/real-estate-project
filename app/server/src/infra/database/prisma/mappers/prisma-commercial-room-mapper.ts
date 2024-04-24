import { CommercialRoom } from '@/entities/commercial-room';
import { Prisma, Property, PropertyType } from '@prisma/client';
import { CommercialType } from '@/entities/enums/commercial-type';

export class PrismaCommercialRoomMapper {
	static toPrisma(commercialRoom: CommercialRoom): Prisma.PropertyUncheckedCreateInput {
		return {
			addressId: commercialRoom.addressId,
			areaSize: commercialRoom.areaSize,
			builtYear: commercialRoom.builtYear,
			description: commercialRoom.description,
			sponsorId: commercialRoom.sponsorId,
			ownerId: commercialRoom.ownerId,
			price: commercialRoom.price,
			status: commercialRoom.status,
			type: PropertyType.COMMERCIAL,
			floors: commercialRoom.floors,
			furniture: commercialRoom.furniture,
			commercialType: commercialRoom.type,
			internetAccess: commercialRoom.internetAccess,
			office: commercialRoom.office,
			restRoom: commercialRoom.restRoom,
			securitySystem: commercialRoom.securitySystem,
		};
	}

	static toDomain(raw: Property): CommercialRoom {
		return CommercialRoom.create({
			cod: raw.cod,
			addressId: raw.addressId,
			areaSize: raw.areaSize,
			builtYear: raw.builtYear,
			description: raw.description,
			sponsorId: raw.sponsorId,
			ownerId: raw.ownerId,
			price: raw.price != null ? raw.price.toNumber() : 0,
			status: null,
			type: CommercialType.COMMERCIAL_ROOM,
			floors: raw.floors,
			furniture: raw.furniture,
			imagesIds: [],
			internetAccess: raw.internetAccess,
			office: raw.office,
			restRoom: raw.restRoom,
			securitySystem: raw.securitySystem,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt
		});
	}
}