import { Company } from '@/entities/company';

export interface CompanyRepository {

    create(company: Company): Promise<void>

    findByName(name: string): Promise<Company | null>
}