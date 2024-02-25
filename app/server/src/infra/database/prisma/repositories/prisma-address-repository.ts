import { Injectable } from '@nestjs/common';
import { Address } from '@/entities/address';
import { PrismaService } from '../prisma.service';
import { AddressRepository } from '@/repositories/address-repository';
import { PrismaAddressMapper } from '../mappers/prisma-address-mapper';

@Injectable()
export class PrismaAddressRepository implements AddressRepository {
	constructor(private prismaConnection: PrismaService) {}

	async create(address: Address): Promise<void> {
		const data = PrismaAddressMapper.toPrisma(address);

		await this.prismaConnection.address.create({ data });
	}
    
}