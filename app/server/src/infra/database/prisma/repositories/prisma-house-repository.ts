import { House } from '@/entities/house';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaHouseMapper } from '../mappers/prisma-house-mapper';
import { PropertyRepository } from '@/repositories/property-repository';

@Injectable()
export class PrismaHouseRepository implements PropertyRepository<House> {
	constructor(private prismaConnection: PrismaService) {}

	async create(property: House): Promise<void> {
		const data = PrismaHouseMapper.toPrisma(property);
        
		await this.prismaConnection.property.create({ data });
	}
}