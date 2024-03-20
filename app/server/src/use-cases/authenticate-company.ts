import { Either, left, right } from '@/utils/either';
import { Encrypter } from '@/cryptography/encrypter';
import { HashComparer } from '@/cryptography/hash-comparer';
import { CompanyRepository } from '@/repositories/company-repository';
import { WrongCredentialsError } from '@/errors/wrong-credentials-error';

interface AuthenticateCompanyUseCaseRequest {
    email: string
    password: string
}

type AuthenticateCompanyUseCaseResponse = Either<WrongCredentialsError, { accessToken: string }> 

export class AuthenticateCompanyUseCase {
	constructor(private companyRepository: CompanyRepository, private hashComparer: HashComparer, private encrypter: Encrypter) {}

	async handle({ email, password }: AuthenticateCompanyUseCaseRequest): Promise<AuthenticateCompanyUseCaseResponse> {
		const company = await this.companyRepository.findByEmail(email);

		if (!company) {
			return left(new WrongCredentialsError());
		}

		const doesPasswordMatch = await this.hashComparer.compare(password, company.password);

		if (!doesPasswordMatch) {
			return left(new WrongCredentialsError());
		}

		const payload = { sub: company.id };

		const accessToken = await this.encrypter.encrypt(payload);

		return right({
			accessToken
		});
	}
}