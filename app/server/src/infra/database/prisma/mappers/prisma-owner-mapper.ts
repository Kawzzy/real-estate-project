import { Owner } from '@/entities/owner';
import { Prisma, User } from '@prisma/client';

export class PrismaOwnerMapper {
	static toPrisma(owner: Owner): Prisma.UserUncheckedCreateInput {
		return {
			id: owner.id,
			cod: owner.cod,
			name: owner.name,
			contactId: owner.contactId,
			createdAt: owner.createdAt
		};
	}

	static toDomain(raw: User): Owner {
		return Owner.create({
			cod: raw.cod,
			name: raw.name,
			contactId: raw.contactId,
			createdAt: raw.createdAt,
			propertiesIds: []
		});
	}
}