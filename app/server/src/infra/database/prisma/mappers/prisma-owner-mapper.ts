import { Owner } from '@/entities/owner';
import { Prisma, User } from '@prisma/client';

export class PrismaOwnerMapper {
	static toPrisma(owner: Owner): Prisma.UserUncheckedCreateInput {
		return {
			id: owner.id,
			cod: owner.cod,
			name: owner.name,
			password: owner.password,
			contactId: owner.contactId,
			createdAt: owner.createdAt
		};
	}

	static toDomain(raw: User): Owner {
		return Owner.create({
			cod: raw.cod,
			name: raw.name,
			password: raw.password,
			contactId: raw.contactId,
			createdAt: raw.createdAt,
			propertiesIds: []
		}, raw.id);
	}
}