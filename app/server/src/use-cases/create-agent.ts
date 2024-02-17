import { Agent } from '@/entities/Agent';
import { Either, left, right } from '@/utils/either';
import { Contact } from '@/entities/value-objects/contact';
import { AgentRepository } from '@/repositories/agent-repository';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';

interface CreateAgentUseCaseRequest {
    name: string
    contact: Contact
    companyId: string
    propertiesIds: string[]
}

type CreateAgentUseCaseResponse = Either<EmailAlreadyExistsError, { agent: Agent }>

export class CreateAgentUseCase {

	constructor(private agentRepository: AgentRepository) {}

	async handle({ name, contact, companyId, propertiesIds }: CreateAgentUseCaseRequest): Promise<CreateAgentUseCaseResponse> {

		const existingAgent = await this.agentRepository.findByEmail(contact.email);

		if (existingAgent) {
			return left(new EmailAlreadyExistsError(contact.email));
		}

		const agent = Agent.create({
			name,
			contact,
			companyId,
			propertiesIds
		});

		await this.agentRepository.create(agent);

		return right({ agent });
	}
}