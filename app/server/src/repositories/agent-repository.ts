import { Agent } from '@/entities/agent';
import { UserRepository } from './user-repository';

export interface AgentRepository extends UserRepository<Agent> {}