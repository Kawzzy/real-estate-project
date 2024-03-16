import { Agent } from '@/entities/agent';
import { Contact } from '@/entities/contact';
import { describe, beforeEach, it, expect } from 'vitest';
import { FakeHasher } from 'test/infra/cryptography/fake-hasher';
import { FakeEncrypter } from 'test/infra/cryptography/fake-encrypter';
import { AuthenticateAgentUseCase } from '@/use-cases/authenticate-agent';
import { InMemoryAgentRepository } from 'test/repositories/in-memory-agent-repository';
import { InMemoryContactRepository } from 'test/repositories/in-memory-contact-repository';

let sut: AuthenticateAgentUseCase;
let inMemoryContactRepository: InMemoryContactRepository;
let inMemoryAgentRepository: InMemoryAgentRepository;
let fakeHasher: FakeHasher;
let fakeEncrypter: FakeEncrypter;

describe('Authenticate Agent', () => {

	beforeEach(() => {
		inMemoryContactRepository = new InMemoryContactRepository();
		inMemoryAgentRepository = new InMemoryAgentRepository(inMemoryContactRepository);
		fakeHasher = new FakeHasher();
		fakeEncrypter = new FakeEncrypter();
		sut = new AuthenticateAgentUseCase(inMemoryAgentRepository, fakeHasher, fakeEncrypter);
	});

	it('should authenticate an Agent', async () => {

		const agentName = 'John Doe';
		const agentCellphone = '47 992-145-543';
		const agentEmail = 'agent@test.com';
		const password = '87654321';

		const contact = Contact.create({
			cellphone: agentCellphone,
			email: agentEmail,
		});
		
		inMemoryContactRepository.contacts.push(contact);
        
		const agent = Agent.create({
			name: agentName,
			password: await fakeHasher.hash(password),
			contactId: contact.id,
			companyId: '1',
			propertiesIds: []
		});

		inMemoryAgentRepository.agents.push(agent);
        
		const result = await sut.handle({
			email: agentEmail,
			password
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual({
			accessToken: expect.any(String)
		});
		expect(inMemoryAgentRepository.agents).toHaveLength(1);
		expect(inMemoryAgentRepository.agents[0].name).toEqual(agentName);
	});
});