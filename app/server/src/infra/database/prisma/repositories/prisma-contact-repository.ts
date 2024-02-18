import { Injectable } from '@nestjs/common';
import { Contact } from '@/entities/contact';
import { PrismaService } from '../prisma.service';
import { ContactRepository } from '@/repositories/contact-repository';
import { PrismaContactMapper } from '../mappers/prisma-contact-mapper';

@Injectable()
export class PrismaContactRepository implements ContactRepository {
	constructor(private prismaConnection: PrismaService) {}

	async create(contact: Contact): Promise<void> {
		const data = PrismaContactMapper.toPrisma(contact);

		await this.prismaConnection.contact.create({ data });
	}
}