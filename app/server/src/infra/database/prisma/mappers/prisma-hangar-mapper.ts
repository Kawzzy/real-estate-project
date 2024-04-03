import { Hangar } from '@/entities/hangar';
import { Prisma, PropertyType } from '@prisma/client';

export class PrismaHangarMapper {
	static toPrisma(hangar: Hangar): Prisma.PropertyUncheckedCreateInput {
		return {
			addressId: hangar.address.id,
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
			commercialType: hangar.type
		};
	}
}