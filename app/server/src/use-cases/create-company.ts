import { Company } from '@/entities/company';
import { Contact } from '@/entities/contact';
import { Either, left, right } from '@/utils/either';
import { Address } from '@/entities/value-objects/address';
import { CompanyRepository } from '@/repositories/company-repository';
import { CompanyAlreadyExistsError } from '@/errors/company-already-exists-error';

interface CreateCompanyUseCaseRequest {
    name: string
    agentsIds?: string[]
    propertiesIds?: string[]
    contact: Contact
    address: Address
}

type CreateCompanyUseCaseResponse  = Either<CompanyAlreadyExistsError, { company: Company }>

export class CreateCompanyUseCase {

	constructor(private companyRepository: CompanyRepository) {}

	async handle({ name, agentsIds, propertiesIds, contact, address }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
        
		const existingCompany = await this.companyRepository.findByName(name);

		if (existingCompany) {
			return left(new CompanyAlreadyExistsError(name));
		}

		const company = Company.create({
			name,
			agentsIds: agentsIds,
			propertiesIds: propertiesIds,
			contact: contact,
			address: address
		});

		await this.companyRepository.create(company);

		return right({ company });
	}
}