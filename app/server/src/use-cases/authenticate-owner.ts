import { Either, left, right } from '@/utils/either';
import { Encrypter } from '@/cryptography/encrypter';
import { HashComparer } from '@/cryptography/hash-comparer';
import { OwnerRepository } from '@/repositories/owner-repository';
import { WrongCredentialsError } from '@/errors/wrong-credentials-error';

interface AuthenticateOwnerUseCaseRequest {
    email: string
    password: string
}

type AuthenticateOwnerUseCaseResponse = Either<WrongCredentialsError, { accessToken: string }>

export class AuthenticateOwnerUseCase {
	constructor(private ownerRepository: OwnerRepository, private hashComparer: HashComparer, private encryper: Encrypter) {}

	async handle({ email, password }: AuthenticateOwnerUseCaseRequest): Promise<AuthenticateOwnerUseCaseResponse> {
		const owner = await this.ownerRepository.findByEmail(email);

		if (!owner) {
			return left(new WrongCredentialsError());
		}
		
		const doesPasswordMatch = await this.hashComparer.compare(password, owner.password);
        
		if (!doesPasswordMatch) {
			return left(new WrongCredentialsError());
		}

		const payload = { sub: owner.id };

		const accessToken = await this.encryper.encrypt(payload);

		return right({
			accessToken
		});
	}
}