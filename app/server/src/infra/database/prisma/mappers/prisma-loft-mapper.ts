import { Loft } from '@/entities/loft';
import { Prisma, PropertyType } from '@prisma/client';

export class PrismaLoftMapper {
	static toPrisma(loft: Loft): Prisma.PropertyUncheckedCreateInput {
		return {
			addressId: loft.address.id,
			amenities: loft.amenities,
			areaSize: loft.areaSize,
			builtYear: loft.builtYear,
			description: loft.description,
			sponsorId: loft.sponsorId,
			ownerId: loft.ownerId,
			price: loft.price,
			status: loft.status,
			type: PropertyType.RESIDENTIAL,
			airConditioner: loft.airConditioner,
			balcony: loft.balcony,
			bathrooms: loft.bathrooms,
			bedrooms: loft.bedrooms,
			condominium: loft.condominium,
			condominiumTax: loft.condominiumTax,
			dinnerRoom: loft.dinnerRoom,
			elevator: loft.elevator,
			floors: loft.floors,
			furniture: loft.furniture,
			garage: loft.garage,
			gym: loft.gym,
			heat: loft.heat,
			kitchen: loft.dinnerRoom,
			laundry: loft.laundry,
			livingRoom: loft.livingRoom,
			playground: loft.playground,
			pool: loft.pool,
			socialSpace: loft.socialSpace,
			residentialType: loft.type,
		};
	}
}