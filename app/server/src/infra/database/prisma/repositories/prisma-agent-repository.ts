import { Agent } from '@/entities/Agent';
import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { AgentRepository } from '@/repositories/agent-repository';
import { PrismaAgentMapper } from '../mappers/prisma-agent-mapper';

@Injectable()
export class PrismaAgentRepository implements AgentRepository {
	constructor(private prismaConnection: PrismaService) {}
    
	async create(agent: Agent): Promise<void> {
		const data = PrismaAgentMapper.toPrisma(agent);

		await this.prismaConnection.user.create({ data });
	}
    
	async findByEmail(email: string): Promise<Agent> {
		const agent = await this.prismaConnection.user.findFirst({
			where: {
				contact: {
					email
				}
			}
		});

		return agent ? PrismaAgentMapper.toDomain(agent) : null;
	}
}