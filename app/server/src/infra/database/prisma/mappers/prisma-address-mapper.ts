import { Prisma } from '@prisma/client';
import { Address } from '@/entities/address';

export class PrismaAddressMapper {

	static toPrisma(address: Address): Prisma.AddressUncheckedCreateInput {
		return {
			id: address.id,
			number: address.number,
			complement: address.complement,
			zipCodeInfoId: address.zipCode,
			createdAt: address.createdAt
		};
	}
}