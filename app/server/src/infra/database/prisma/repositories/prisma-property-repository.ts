import { Injectable } from '@nestjs/common';
import { Apartment } from '@/entities/apartment';
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
}