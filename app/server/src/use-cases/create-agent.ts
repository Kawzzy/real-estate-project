import { Agent } from '@/entities/Agent';
import { Contact } from '@/entities/contact';
import { Either, left, right } from '@/utils/either';
import { AgentRepository } from '@/repositories/agent-repository';
import { ContactRepository } from '@/repositories/contact-repository';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';

interface CreateAgentUseCaseRequest {
    name: string
	telephone?: string
	cellphone: string
	email: string
    companyId: string
    propertiesIds: string[]
}

type CreateAgentUseCaseResponse = Either<EmailAlreadyExistsError, { agent: Agent }>

export class CreateAgentUseCase {

	constructor(
		private contactRepository: ContactRepository,
		private agentRepository: AgentRepository
	) {}

	async handle({ name, telephone, cellphone, email, companyId, propertiesIds }: CreateAgentUseCaseRequest): Promise<CreateAgentUseCaseResponse> {

		const existingAgent = await this.agentRepository.findByEmail(email);

		if (existingAgent) {
			return left(new EmailAlreadyExistsError(email));
		}

		const contact = Contact.create({
			telephone,
			cellphone,
			email
		});

		await this.contactRepository.create(contact);

		const agent = Agent.create({
			name,
			contactId: contact.id,
			companyId,
			propertiesIds
		});

		await this.agentRepository.create(agent);

		return right({ agent });
	}
}