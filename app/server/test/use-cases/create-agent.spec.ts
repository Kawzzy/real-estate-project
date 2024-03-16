import { Agent } from '@/entities/agent';
import { Contact } from '@/entities/contact';
import { describe, beforeEach, it, expect } from 'vitest';
import { CreateAgentUseCase } from '@/use-cases/create-agent';
import { FakeHasher } from 'test/infra/cryptography/fake-hasher';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';
import { InMemoryAgentRepository } from 'test/repositories/in-memory-agent-repository';
import { InMemoryContactRepository } from 'test/repositories/in-memory-contact-repository';

let sut: CreateAgentUseCase;
let inMemoryContactRepository: InMemoryContactRepository;
let inMemoryAgentRepository: InMemoryAgentRepository;
let fakeHasher: FakeHasher;

describe('Create Agent', () => {

	beforeEach(() => {
		inMemoryContactRepository = new InMemoryContactRepository();
		inMemoryAgentRepository = new InMemoryAgentRepository(inMemoryContactRepository);
		fakeHasher = new FakeHasher();
		sut = new CreateAgentUseCase(inMemoryContactRepository, inMemoryAgentRepository, fakeHasher);
	});

	it('should create an Agent', async () => {

		const agentName = 'John Doe';
		const agentCellphone = '47 992-145-543';
		const agentEmail = 'agent@test.com';
		const password = '87654321';
        
		const result = await sut.handle({
			name: agentName,
			password,
			cellphone: agentCellphone,
			email: agentEmail,
			companyId: '1',
			propertiesIds: []
		});

		expect(inMemoryContactRepository.contacts).toHaveLength(1);

		const contactId = inMemoryContactRepository.contacts[0].id;

		const hashedPassword = await fakeHasher.hash(password);

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual(
			expect.objectContaining({
				agent: expect.objectContaining({
					contactId
				})
			})
		);
		expect(inMemoryAgentRepository.agents).toHaveLength(1);
		expect(inMemoryAgentRepository.agents[0].name).toEqual(agentName);
		expect(inMemoryAgentRepository.agents[0].password).toEqual(hashedPassword);
	});

	it('shouldn\'t create an Agent with same email', async () => {

		const agentCellphone = '47 992-145-543';
		const agentEmail = 'agent@test.com';
		const password = '12345678';
        
		const contact = Contact.create({
			cellphone: agentCellphone,
			email: agentEmail
		});

		inMemoryContactRepository.contacts.push(contact);

		inMemoryAgentRepository.agents.push(Agent.create({
			name: 'Mr. Dre',
			password,
			contactId: contact.id,
			companyId: '1',
			propertiesIds: []
		}));

		const result = await sut.handle({
			name: 'John Doe',
			password,
			cellphone: agentCellphone,
			email: agentEmail,
			companyId: '1',
			propertiesIds: []
		});
		
		expect(result.isLeft()).toBe(true);
		expect(inMemoryContactRepository.contacts).toHaveLength(1);
		expect(result.value).toBeInstanceOf(EmailAlreadyExistsError);
	});
});