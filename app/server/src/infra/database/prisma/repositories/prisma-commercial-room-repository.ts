import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CommercialRoom } from '@/entities/commercial-room';
import { CommercialType } from '@/entities/enums/commercial-type';
import { PropertyRepository } from '@/repositories/property-repository';
import { PrismaCommercialRoomMapper } from '../mappers/prisma-commercial-room-mapper';

@Injectable()
export class PrismaCommercialRoomRepository implements PropertyRepository<CommercialRoom> {
	constructor(private prismaConnection: PrismaService) {}

	async create(property: CommercialRoom): Promise<void> {
		const data = PrismaCommercialRoomMapper.toPrisma(property);
        
		await this.prismaConnection.property.create({ data });
	}
	
	async getAll(): Promise<CommercialRoom[]> {
		const properties = await this.prismaConnection.property.findMany({
			where: {
				commercialType: CommercialType.COMMERCIAL_ROOM
			}
		});

		return properties.map(PrismaCommercialRoomMapper.toDomain);
	}

	async get(propertyId: string): Promise<CommercialRoom | null> {
		const property = await this.prismaConnection.property.findFirst({
			where: {
				id: propertyId
			}
		});

		return property ? PrismaCommercialRoomMapper.toDomain(property) : null;
	}

	async delete(propertyId: string): Promise<void> {
		await this.prismaConnection.property.delete({
			where: {
				id: propertyId
			}
		});
	}
}