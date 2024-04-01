import { Studio } from '@/entities/studio';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { PrismaStudioMapper } from '../mappers/prisma-studio-mapper';
import { PropertyRepository } from '@/repositories/property-repository';

@Injectable()
export class PrismaStudioRepository implements PropertyRepository<Studio> {
	constructor(private prismaConnection: PrismaService) {}

	async create(property: Studio): Promise<void> {
		const data = PrismaStudioMapper.toPrisma(property);
        
		await this.prismaConnection.property.create({ data });
	}
}