import { House } from '@/entities/house';
import { Prisma, Property, PropertyType } from '@prisma/client';
import { ResidentialType } from '@/entities/enums/residential-type';

export class PrismaHouseMapper {
	static toPrisma(house: House): Prisma.PropertyUncheckedCreateInput {
		return {
			addressId: house.addressId,
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
			deck: house.deck,
			porch: house.porch,
			backyard: house.backyard,
			driveWay: house.driveWay,
			frontYard: house.frontYard
		};
	}

	static toDomain(raw: Property): House {
		return House.create({
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
			type: ResidentialType.HOUSE,
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
			backyard: raw.backyard,
			deck: raw.deck,
			driveWay: raw.driveWay,
			frontYard: raw.frontYard,
			imagesIds: [],
			porch: raw.porch,
			createdAt: raw.createdAt,
			updatedAt: raw.updatedAt
		}, raw.id);
	}
}