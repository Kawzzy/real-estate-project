import { Studio } from '@/entities/studio';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ResidentialType } from '@/entities/enums/residential-type';
import { PrismaStudioMapper } from '../mappers/prisma-studio-mapper';
import { PropertyRepository } from '@/repositories/property-repository';

@Injectable()
export class PrismaStudioRepository implements PropertyRepository<Studio> {
	constructor(private prismaConnection: PrismaService) {}

	async create(property: Studio): Promise<void> {
		const data = PrismaStudioMapper.toPrisma(property);
        
		await this.prismaConnection.property.create({ data });
	}
	
	async getAll(): Promise<Studio[]> {
		const properties = await this.prismaConnection.property.findMany({
			where: {
				residentialType: ResidentialType.STUDIO
			}
		});

		return properties.map(PrismaStudioMapper.toDomain);
	}

	async get(propertyId: string): Promise<Studio | null> {
		const property = await this.prismaConnection.property.findFirst({
			where: {
				id: propertyId
			}
		});

		return property ? PrismaStudioMapper.toDomain(property) : null;
	}

	async delete(propertyId: string): Promise<void> {
		await this.prismaConnection.property.delete({
			where: {
				id: propertyId
			}
		});
	}
}