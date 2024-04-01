import { Studio } from '@/entities/studio';
import { Prisma, PropertyType } from '@prisma/client';

export class PrismaStudioMapper {
	static toPrisma(studio: Studio): Prisma.PropertyUncheckedCreateInput {
		return {
			addressId: studio.address.id,
			amenities: studio.amenities,
			areaSize: studio.areaSize,
			builtYear: studio.builtYear,
			description: studio.description,
			sponsorId: studio.sponsorId,
			ownerId: studio.ownerId,
			price: studio.price,
			status: studio.status,
			type: PropertyType.RESIDENTIAL,
			airConditioner: studio.airConditioner,
			balcony: studio.balcony,
			bathrooms: studio.bathrooms,
			bedrooms: studio.bedrooms,
			condominium: studio.condominium,
			condominiumTax: studio.condominiumTax,
			dinnerRoom: studio.dinnerRoom,
			elevator: studio.elevator,
			floors: studio.floors,
			furniture: studio.furniture,
			garage: studio.garage,
			gym: studio.gym,
			heat: studio.heat,
			kitchen: studio.dinnerRoom,
			laundry: studio.laundry,
			livingRoom: studio.livingRoom,
			playground: studio.playground,
			pool: studio.pool,
			socialSpace: studio.socialSpace,
			residentialType: studio.type,
		};
	}
}