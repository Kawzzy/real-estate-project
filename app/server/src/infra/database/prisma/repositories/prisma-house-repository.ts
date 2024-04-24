import { House } from '@/entities/house';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaHouseMapper } from '../mappers/prisma-house-mapper';
import { ResidentialType } from '@/entities/enums/residential-type';
import { PropertyRepository } from '@/repositories/property-repository';

@Injectable()
export class PrismaHouseRepository implements PropertyRepository<House> {
	constructor(private prismaConnection: PrismaService) {}

	async create(property: House): Promise<void> {
		const data = PrismaHouseMapper.toPrisma(property);
        
		await this.prismaConnection.property.create({ data });
	}
	
	async getAll(): Promise<House[]> {
		const properties = await this.prismaConnection.property.findMany({
			where: {
				residentialType: ResidentialType.HOUSE
			}
		});

		return properties.map(PrismaHouseMapper.toDomain);
	}

	async get(propertyId: string): Promise<House | null> {
		const property = await this.prismaConnection.property.findFirst({
			where: {
				id: propertyId
			}
		});

		return property ? PrismaHouseMapper.toDomain(property) : null;
	}

	async delete(propertyId: string): Promise<void> {
		await this.prismaConnection.property.delete({
			where: {
				id: propertyId
			}
		});
	}
}