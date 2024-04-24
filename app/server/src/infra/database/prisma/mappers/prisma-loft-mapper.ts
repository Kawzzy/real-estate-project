import { Loft } from '@/entities/loft';
import { Prisma, Property, PropertyType } from '@prisma/client';
import { ResidentialType } from '@/entities/enums/residential-type';

export class PrismaLoftMapper {
	static toPrisma(loft: Loft): Prisma.PropertyUncheckedCreateInput {
		return {
			addressId: loft.addressId,
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

	static toDomain(raw: Property): Loft {
		return Loft.create({
			cod: raw.cod,
			addressId: raw.addressId,
			amenities: raw.amenities,
			areaSize: raw.areaSize,
			builtYear: raw.builtYear,
			description: raw.description,
			imagesIds: [],
			ownerId: raw.ownerId,
			price: raw.price != null ? raw.price.toNumber() : 0,
			sponsorId: raw.sponsorId,
			status: null,
			type: ResidentialType.LOFT,
			airConditioner: raw.airConditioner,
			balcony: raw.balcony,
			bathrooms: raw.bathrooms,
			bedrooms: raw.bedrooms,
			condominium: raw.condominium,
			condominiumTax: raw.condominiumTax != null ? raw.condominiumTax.toNumber() : 0,
			createdAt: raw.createdAt,
			dinnerRoom: raw.dinnerRoom,
			elevator: raw.elevator,
			floors: raw.floors,
			furniture: raw.furniture,
			garage: raw.garage,
			gym: raw.gym,
			heat: raw.heat,
			kitchen: raw.kitchen,
			laundry: raw.laundry,
			livingRoom: raw.livingRoom,
			playground: raw.playground,
			pool: raw.pool,
			socialSpace: raw.socialSpace,
			updatedAt: raw.updatedAt
		}, raw.id);
	}
}