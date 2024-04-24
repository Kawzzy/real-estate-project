import { Apartment } from '@/entities/apartment';
import { Prisma, Property, PropertyType } from '@prisma/client';
import { ResidentialType } from '@/entities/enums/residential-type';

export class PrismaApartmentMapper {
	static toPrisma(apartment: Apartment): Prisma.PropertyUncheckedCreateInput {
		return {
			addressId: apartment.addressId,
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

	static toDomain(raw: Property): Apartment {
		return Apartment.create({
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
			type: ResidentialType.APARTMENT,
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