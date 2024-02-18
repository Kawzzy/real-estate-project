import { Prisma } from '@prisma/client';
import { Contact } from '@/entities/contact';

export class PrismaContactMapper {
	static toPrisma(contact: Contact): Prisma.ContactCreateInput {
		return {
			id: contact.id,
			telephone: contact.telephone,
			cellphone: contact.cellphone,
			email: contact.email,
			createdAt: contact.createdAt
		};
	}
}