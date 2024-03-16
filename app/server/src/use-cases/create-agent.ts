import { Agent } from '@/entities/Agent';
import { Contact } from '@/entities/contact';
import { Either, left, right } from '@/utils/either';
import { HashGenerator } from '@/cryptography/hash-generator';
import { AgentRepository } from '@/repositories/agent-repository';
import { ContactRepository } from '@/repositories/contact-repository';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';

interface CreateAgentUseCaseRequest {
    name: string
	password: string
	telephone?: string
	cellphone: string
	email: string
    companyId: string
    propertiesIds: string[]
}

type CreateAgentUseCaseResponse = Either<EmailAlreadyExistsError, { agent: Agent }>

export class CreateAgentUseCase {

	constructor(private contactRepository: ContactRepository, private agentRepository: AgentRepository, private hashGenerator: HashGenerator) {}

	async handle({ name, password, telephone, cellphone, email, companyId, propertiesIds }: CreateAgentUseCaseRequest): Promise<CreateAgentUseCaseResponse> {

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

		const hashedPassword = await this.hashGenerator.hash(password);

		const agent = Agent.create({
			name,
			password: hashedPassword,
			contactId: contact.id,
			companyId,
			propertiesIds
		});

		await this.agentRepository.create(agent);

		return right({ agent });
	}
}