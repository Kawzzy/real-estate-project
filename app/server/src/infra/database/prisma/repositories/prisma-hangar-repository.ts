import { Hangar } from '@/entities/hangar';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaHangarMapper } from '../mappers/prisma-hangar-mapper';
import { PropertyRepository } from '@/repositories/property-repository';

@Injectable()
export class PrismaHangarRepository implements PropertyRepository<Hangar> {
	constructor(private prismaConnection: PrismaService) {}

	async create(property: Hangar): Promise<void> {
		const data = PrismaHangarMapper.toPrisma(property);
        
		await this.prismaConnection.property.create({ data });
	}
}