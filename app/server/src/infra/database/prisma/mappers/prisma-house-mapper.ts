import { House } from '@/entities/house';
import { Prisma, PropertyType } from '@prisma/client';

export class PrismaHouseMapper {
	static toPrisma(house: House): Prisma.PropertyUncheckedCreateInput {
		return {
			addressId: house.address.id,
			amenities: house.amenities,
			areaSize: house.areaSize,
			builtYear: house.builtYear,
			description: house.description,
			sponsorId: house.sponsorId,
			ownerId: house.ownerId,
			price: house.price,
			status: house.status,
			type: PropertyType.RESIDENTIAL,
			airConditioner: house.airConditioner,
			balcony: house.balcony,
			bathrooms: house.bathrooms,
			bedrooms: house.bedrooms,
			condominium: house.condominium,
			condominiumTax: house.condominiumTax,
			dinnerRoom: house.dinnerRoom,
			elevator: house.elevator,
			floors: house.floors,
			furniture: house.furniture,
			garage: house.garage,
			gym: house.gym,
			heat: house.heat,
			kitchen: house.dinnerRoom,
			laundry: house.laundry,
			livingRoom: house.livingRoom,
			playground: house.playground,
			pool: house.pool,
			socialSpace: house.socialSpace,
			residentialType: house.type,
		};
	}
}