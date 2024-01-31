import { Agent } from '@/entities/agent';
import { AgentRepository } from '@/repositories/agent-repository';

export class InMemoryAgentRepository implements AgentRepository {
	
	public agents: Agent[] = [];
    
	async create(agent: Agent): Promise<void> {
		this.agents.push(agent);
	}
    
	async findByEmail(email: string): Promise<Agent> {
		return this.agents.find(agent => agent.contact.email === email) ?? null;
	}
}