import { Hangar } from '@/entities/hangar';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CommercialType } from '@/entities/enums/commercial-type';
import { PrismaHangarMapper } from '../mappers/prisma-hangar-mapper';
import { PropertyRepository } from '@/repositories/property-repository';

@Injectable()
export class PrismaHangarRepository implements PropertyRepository<Hangar> {
	constructor(private prismaConnection: PrismaService) {}

	async create(property: Hangar): Promise<void> {
		const data = PrismaHangarMapper.toPrisma(property);
        
		await this.prismaConnection.property.create({ data });
	}
	
	async getAll(): Promise<Hangar[]> {
		const properties = await this.prismaConnection.property.findMany({
			where: {
				commercialType: CommercialType.HANGAR
			}
		});

		return properties.map(PrismaHangarMapper.toDomain);
	}

	async get(propertyId: string): Promise<Hangar | null> {
		const property = await this.prismaConnection.property.findFirst({
			where: {
				id: propertyId
			}
		});

		return property ? PrismaHangarMapper.toDomain(property) : null;
	}

	async delete(propertyId: string): Promise<void> {
		await this.prismaConnection.property.delete({
			where: {
				id: propertyId
			}
		});
	}
}