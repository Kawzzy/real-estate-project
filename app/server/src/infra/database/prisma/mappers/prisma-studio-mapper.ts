import { Studio } from '@/entities/studio';
import { Prisma, Property, PropertyType } from '@prisma/client';
import { ResidentialType } from '@/entities/enums/residential-type';

export class PrismaStudioMapper {
	static toPrisma(studio: Studio): Prisma.PropertyUncheckedCreateInput {
		return {
			addressId: studio.addressId,
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

	static toDomain(raw: Property): Studio {
		return Studio.create({
			cod: raw.cod,
			addressId: raw.addressId,
			amenities: raw.amenities,
			areaSize: raw.areaSize,
			builtYear: raw.builtYear,
			description: raw.description,
			sponsorId: raw.sponsorId,
			ownerId: raw.ownerId,
			price: raw.price != null ? raw.price.toNumber() : 0,
			status: null,
			type: ResidentialType.STUDIO,
			airConditioner: raw.airConditioner,
			balcony: raw.balcony,
			bathrooms: raw.bathrooms,
			bedrooms: raw.bedrooms,
			condominium: raw.condominium,
			condominiumTax: raw.condominiumTax != null ? raw.condominiumTax.toNumber() : 0,
			dinnerRoom: raw.dinnerRoom,
			elevator: raw.elevator,
			floors: raw.floors,
			furniture: raw.furniture,
			garage: raw.garage,
			gym: raw.gym,
			heat: raw.heat,
			kitchen: raw.dinnerRoom,
			laundry: raw.laundry,
			livingRoom: raw.livingRoom,
			playground: raw.playground,
			pool: raw.pool,
			socialSpace: raw.socialSpace,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt,
			imagesIds: []
		}, raw.id);
	}
}