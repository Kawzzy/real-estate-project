import { Agent } from '@/entities/agent';
import { AgentRepository } from '@/repositories/agent-repository';
import { InMemoryContactRepository } from './in-memory-contact-repository';

export class InMemoryAgentRepository implements AgentRepository {
	
	public agents: Agent[] = [];

	constructor(private inMemoryContactRepository: InMemoryContactRepository) {}
    
	async create(agent: Agent): Promise<void> {
		this.agents.push(agent);
	}
    
	async findByEmail(email: string): Promise<Agent> {
		const contact = this.inMemoryContactRepository.contacts.find(contact => contact.email === email);
		return this.agents.find(agent => agent.contactId === contact.id) ?? null;
	}
}