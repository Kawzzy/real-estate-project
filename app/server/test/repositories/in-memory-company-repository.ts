import { Company } from '@/entities/company';
import { CompanyRepository } from '@/repositories/company-repository';
import { InMemoryContactRepository } from './in-memory-contact-repository';

export class InMemoryCompanyRepository implements CompanyRepository {
	constructor(private inMemoryContactRepository: InMemoryContactRepository) {}

	public companies: Company[] = [];

	async create(company: Company): Promise<void> {
		this.companies.push(company);
	}

	async findByName(name: string): Promise<Company> {
		return this.companies.find(company => company.name === name) ?? null;
	}

	async findByEmail(email: string): Promise<Company> {
		const contact = this.inMemoryContactRepository.contacts.find(contact => contact.email === email);
		return this.companies.find(company => company.contactId === contact.id) ?? null;
	}
}