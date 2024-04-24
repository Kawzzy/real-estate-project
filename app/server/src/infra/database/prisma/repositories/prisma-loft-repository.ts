import { Loft } from '@/entities/loft';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaLoftMapper } from '../mappers/prisma-loft-mapper';
import { ResidentialType } from '@/entities/enums/residential-type';
import { PropertyRepository } from '@/repositories/property-repository';

@Injectable()
export class PrismaLoftRepository implements PropertyRepository<Loft> {
	constructor(private prismaConnection: PrismaService) {}

	async create(property: Loft): Promise<void> {
		const data = PrismaLoftMapper.toPrisma(property);
        
		await this.prismaConnection.property.create({ data });
	}
	
	async getAll(): Promise<Loft[]> {
		const properties = await this.prismaConnection.property.findMany({
			where: {
				residentialType: ResidentialType.LOFT
			}
		});

		return properties.map(PrismaLoftMapper.toDomain);
	}

	async get(propertyId: string): Promise<Loft | null> {
		const property = await this.prismaConnection.property.findFirst({
			where: {
				id: propertyId
			}
		});

		return property ? PrismaLoftMapper.toDomain(property) : null;
	}

	async delete(propertyId: string): Promise<void> {
		await this.prismaConnection.property.delete({
			where: {
				id: propertyId
			}
		});
	}
}