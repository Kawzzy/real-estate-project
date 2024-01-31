import { Agent } from '@/entities/Agent';
import { Contact } from '@/entities/value-objects/contact';
import { AgentRepository } from '@/repositories/agent-repository';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';

interface CreateAgentUseCaseRequest {
    name: string
    contact: Contact
    companyId: string
    propertiesIds: string[]
}

interface CreateAgentUseCaseResponse {
    agent: Agent
}

export class CreateAgentUseCase {

	constructor(private agentRepository: AgentRepository) {}

	async handle({ name, contact, companyId, propertiesIds }: CreateAgentUseCaseRequest): Promise<CreateAgentUseCaseResponse> {

		const existingAgent = await this.agentRepository.findByEmail(contact.email);

		if (existingAgent) {
			throw new EmailAlreadyExistsError(contact.email);
		}

		const agent = Agent.create({
			name,
			contact,
			companyId,
			propertiesIds
		});

		await this.agentRepository.create(agent);

		return { agent };
	}
}