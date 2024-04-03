import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { CommercialRoom } from '@/entities/commercial-room';
import { PropertyRepository } from '@/repositories/property-repository';
import { PrismaCommercialRoomMapper } from '../mappers/prisma-commercial-room-mapper';

@Injectable()
export class PrismaCommercialRoomRepository implements PropertyRepository<CommercialRoom> {
	constructor(private prismaConnection: PrismaService) {}

	async create(property: CommercialRoom): Promise<void> {
		const data = PrismaCommercialRoomMapper.toPrisma(property);
        
		await this.prismaConnection.property.create({ data });
	}
}