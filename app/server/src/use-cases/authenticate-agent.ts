import { Either, left, right } from '@/utils/either';
import { Encrypter } from '@/cryptography/encrypter';
import { HashComparer } from '@/cryptography/hash-comparer';
import { AgentRepository } from '@/repositories/agent-repository';
import { WrongCredentialsError } from '@/errors/wrong-credentials-error';

interface AuthenticateAgentUseCaseRequest {
    email: string
    password: string
}

type AuthenticateAgentUseCaseResponse = Either<WrongCredentialsError, { accessToken: string }>

export class AuthenticateAgentUseCase {
	constructor(private agentRepository: AgentRepository, private hashComparer: HashComparer, private encryper: Encrypter) {}

	async handle({ email, password }: AuthenticateAgentUseCaseRequest): Promise<AuthenticateAgentUseCaseResponse> {
		const agent = await this.agentRepository.findByEmail(email);

		if (!agent) {
			return left(new WrongCredentialsError());
		}
		
		const doesPasswordMatch = await this.hashComparer.compare(password, agent.password);
        
		if (!doesPasswordMatch) {
			return left(new WrongCredentialsError());
		}

		const payload = { sub: agent.id };

		const accessToken = await this.encryper.encrypt(payload);

		return right({
			accessToken
		});
	}
}