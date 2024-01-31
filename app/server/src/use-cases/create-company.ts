import { Company } from '@/entities/company';
import { Address } from '@/entities/value-objects/address';
import { Contact } from '@/entities/value-objects/contact';
import { CompanyRepository } from '@/repositories/company-repository';
import { CompanyAlreadyExistsError } from '@/errors/company-already-exists-error';

interface CreateCompanyUseCaseRequest {
    name: string
    agentsIds?: string[]
    propertiesIds?: string[]
    contact: Contact
    address: Address
}

interface CreateCompanyUseCaseResponse {
    company: Company
}

export class CreateCompanyUseCase {

	constructor(private companyRepository: CompanyRepository) {}

	async handle({ name, agentsIds, propertiesIds, contact, address }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
        
		const existingCompany = await this.companyRepository.findByName(name);

		if (existingCompany) {
			throw new CompanyAlreadyExistsError(name);
		}

		const company = Company.create({
			name,
			agentsIds: agentsIds,
			propertiesIds: propertiesIds,
			contact: contact,
			address: address
		});

		await this.companyRepository.create(company);

		return { company };
	}
}