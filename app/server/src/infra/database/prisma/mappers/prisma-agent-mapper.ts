import { Agent } from '@/entities/Agent';
import { Prisma, User } from '@prisma/client';

export class PrismaAgentMapper {
	static toPrisma(agent: Agent): Prisma.UserUncheckedCreateInput {
		return {
			id: agent.id,
			cod: agent.cod,
			name: agent.name,
			password: agent.password,
			contactId: agent.contactId,
			createdAt: agent.createdAt
		};
	}

	static toDomain(raw: User): Agent {
		return Agent.create({
			cod: raw.cod,
			name: raw.name,
			password: raw.password,
			companyId: raw.companyId,
			contactId: raw.contactId,
			createdAt: raw.createdAt,
			propertiesIds: []
		});
	}
}