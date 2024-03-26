import { Apartment } from '@/entities/apartment';
import { Prisma, PropertyType } from '@prisma/client';

export class PrismaApartmentMapper {
	static toPrisma(apartment: Apartment): Prisma.PropertyUncheckedCreateInput {
		return {
			addressId: apartment.address.id,
			amenities: apartment.amenities,
			areaSize: apartment.areaSize,
			builtYear: apartment.builtYear,
			description: apartment.description,
			sponsorId: apartment.sponsorId,
			ownerId: apartment.ownerId,
			price: apartment.price,
			status: apartment.status,
			type: PropertyType.RESIDENTIAL,
			airConditioner: apartment.airConditioner,
			balcony: apartment.balcony,
			bathrooms: apartment.bathrooms,
			bedrooms: apartment.bedrooms,
			condominium: apartment.condominium,
			condominiumTax: apartment.condominiumTax,
			dinnerRoom: apartment.dinnerRoom,
			elevator: apartment.elevator,
			floors: apartment.floors,
			furniture: apartment.furniture,
			garage: apartment.garage,
			gym: apartment.gym,
			heat: apartment.heat,
			kitchen: apartment.dinnerRoom,
			laundry: apartment.laundry,
			livingRoom: apartment.livingRoom,
			playground: apartment.playground,
			pool: apartment.pool,
			socialSpace: apartment.socialSpace,
			residentialType: apartment.type,

		};
	}
}