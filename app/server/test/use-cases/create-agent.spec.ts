import { Agent } from '@/entities/agent';
import { describe, beforeEach, it, expect } from 'vitest';
import { Contact } from '@/entities/value-objects/contact';
import { CreateAgentUseCase } from '@/use-cases/create-agent';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';
import { InMemoryAgentRepository } from 'test/repositories/in-memory-agent-repository';

let sut: CreateAgentUseCase;
let inMemoryAgentRepository: InMemoryAgentRepository;

describe('Create Agent', () => {

	beforeEach(() => {
		inMemoryAgentRepository = new InMemoryAgentRepository();
		sut = new CreateAgentUseCase(inMemoryAgentRepository);
	});

	it('should create an Agent', async () => {

		const agentName = 'John Doe';
		const agentEmail = 'agent@test.com';
        
		const contact = Contact.create({
			cellphone: '47 992-145-543',
			email: agentEmail
		});
        
		const result = await sut.handle({
			name: agentName,
			contact,
			companyId: '1',
			propertiesIds: []
		});

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual(
			expect.objectContaining({
				agent: expect.objectContaining({
					contact: expect.objectContaining({
						email: agentEmail
					})
				})
			})
		);
		expect(inMemoryAgentRepository.agents).toHaveLength(1);
		expect(inMemoryAgentRepository.agents[0].name).toEqual(agentName);
	});

	it('shouldn\'t create an Agent with same email', async () => {

		const agentEmail = 'agent@test.com';
        
		const contact = Contact.create({
			cellphone: '47 992-145-543',
			email: agentEmail
		});

		inMemoryAgentRepository.agents.push(Agent.create({
			name: 'Mr. Dre',
			contact,
			companyId: '1',
			propertiesIds: []
		}));

		const result = await sut.handle({
			name: 'John Doe',
			contact,
			companyId: '1',
			propertiesIds: []
		});
		
		expect(result.isLeft()).toBe(true);
		expect(result.value).toBeInstanceOf(EmailAlreadyExistsError);
	});
});