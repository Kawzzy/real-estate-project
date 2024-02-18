import { Owner } from '@/entities/owner';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { OwnerRepository } from '@/repositories/owner-repository';
import { PrismaOwnerMapper } from '../mappers/prisma-owner-mapper';

@Injectable()
export class PrismaOwnerRepository implements OwnerRepository {
	constructor(private prismaConnection: PrismaService) {}
    
	async create(owner: Owner): Promise<void> {
		const data = PrismaOwnerMapper.toPrisma(owner);

		await this.prismaConnection.user.create({ data });
	}
    
	async findByEmail(email: string): Promise<Owner> {
		const owner = await this.prismaConnection.user.findFirst({
			where: {
				contact: {
					email
				}
			}
		});

		return owner ? PrismaOwnerMapper.toDomain(owner) : null;
	}
}