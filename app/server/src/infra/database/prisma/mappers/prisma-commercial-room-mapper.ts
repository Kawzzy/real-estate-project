import { CommercialRoom } from '@/entities/commercial-room';
import { Prisma, PropertyType } from '@prisma/client';

export class PrismaCommercialRoomMapper {
	static toPrisma(commercialRoom: CommercialRoom): Prisma.PropertyUncheckedCreateInput {
		return {
			addressId: commercialRoom.address.id,
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
			commercialType: commercialRoom.type
		};
	}
}