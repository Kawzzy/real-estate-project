import { Company } from '@/entities/company';
import { CompanyRepository } from '@/repositories/company-repository';

export class InMemoryCompanyRepository implements CompanyRepository {
    
	public companies: Company[] = [];

	async create(company: Company): Promise<void> {
		this.companies.push(company);
	}

	async findByName(name: string): Promise<Company> {
		return this.companies.find(company => company.name === name) ?? null;
	}
}