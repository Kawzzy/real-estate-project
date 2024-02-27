import { Address } from '@/entities/address';
import { Company } from '@/entities/company';
import { Contact } from '@/entities/contact';
import { Either, left, right } from '@/utils/either';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { AddressRepository } from '@/repositories/address-repository';
import { CompanyRepository } from '@/repositories/company-repository';
import { ContactRepository } from '@/repositories/contact-repository';
import { EmailAlreadyExistsError } from '@/errors/email-already-exists-error';
import { CompanyAlreadyExistsError } from '@/errors/company-already-exists-error';

interface CreateCompanyUseCaseRequest {
    name: string
	telephone?: string
	cellphone: string
	email: string
    zipCodeInfo: ZipCodeInfo
	addressNumber: string
	addressComplement?: string
    agentsIds?: string[]
    propertiesIds?: string[]
}

type CreateCompanyUseCaseResponse  = Either<CompanyAlreadyExistsError, { company: Company }>

export class CreateCompanyUseCase {

	constructor(private companyRepository: CompanyRepository, private contactRepository: ContactRepository, private addressRepository: AddressRepository) {}

	async handle({ name, telephone, cellphone, email, zipCodeInfo, addressNumber, addressComplement, agentsIds, propertiesIds }: CreateCompanyUseCaseRequest): Promise<CreateCompanyUseCaseResponse> {
        
		let existingCompany: Company;
		
		existingCompany = await this.companyRepository.findByName(name);

		if (existingCompany) {
			return left(new CompanyAlreadyExistsError(name));
		}

		existingCompany = await this.companyRepository.findByEmail(email);

		if (existingCompany) {
			return left(new EmailAlreadyExistsError(email));
		}
		
		const address = Address.create({
			zipCode: zipCodeInfo.zipCode,
			number: addressNumber,
			complement: addressComplement
		});

		await this.addressRepository.create(address);

		const contact = Contact.create({
			telephone,
			cellphone,
			email
		});

		await this.contactRepository.create(contact);

		const company = Company.create({
			name,
			agentsIds: agentsIds,
			propertiesIds: propertiesIds,
			contactId: contact.id,
			addressId: address.id
		});

		await this.companyRepository.create(company);

		return right({ company });
	}
}