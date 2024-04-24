import { Injectable } from '@nestjs/common';
import { Apartment } from '@/entities/apartment';
import { ResidentialType } from '@prisma/client';
import { PrismaService } from '../prisma.service';
import { PropertyRepository } from '@/repositories/property-repository';
import { PrismaApartmentMapper } from '../mappers/prisma-apartment-mapper';

@Injectable()
export class PrismaApartmentRepository implements PropertyRepository<Apartment> {
	constructor(private prismaConnection: PrismaService) {}

	async create(property: Apartment): Promise<void> {
		const data = PrismaApartmentMapper.toPrisma(property);
        
		await this.prismaConnection.property.create({ data });
	}

	async getAll(): Promise<[] | Apartment[]> {
		const properties = await this.prismaConnection.property.findMany({
			where: {
				residentialType: ResidentialType.APARTMENT
			}
		});

		return properties.map(PrismaApartmentMapper.toDomain);
	}

	async get(propertyId: string): Promise<Apartment | null> {
		const property = await this.prismaConnection.property.findFirst({
			where: {
				id: propertyId
			}
		});

		return property ? PrismaApartmentMapper.toDomain(property) : null;
	}

	async delete(propertyId: string): Promise<void> {
		await this.prismaConnection.property.delete({
			where: {
				id: propertyId
			}
		});
	}
}