import { Loft } from '@/entities/loft';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaLoftMapper } from '../mappers/prisma-loft-mapper';
import { PropertyRepository } from '@/repositories/property-repository';

@Injectable()
export class PrismaLoftRepository implements PropertyRepository<Loft> {
	constructor(private prismaConnection: PrismaService) {}

	async create(property: Loft): Promise<void> {
		const data = PrismaLoftMapper.toPrisma(property);
        
		await this.prismaConnection.property.create({ data });
	}
}