import { Agent } from '@/entities/agent';

export interface AgentRepository {

    create(agent: Agent): Promise<void>

    findByEmail(email: string): Promise<Agent | null>
}