import { Injectable } from '@nestjs/common';
import { Company } from '@/entities/company';
import { PrismaService } from '../prisma.service';
import { CompanyRepository } from '@/repositories/company-repository';
import { PrismaCompanyMapper } from '../mappers/prisma-company-mapper';

@Injectable()
export class PrismaCompanyRepository implements CompanyRepository {
	constructor(private prismaConnection: PrismaService) {}
    
	async create(company: Company): Promise<void> {
		const data = PrismaCompanyMapper.toPrisma(company);

		await this.prismaConnection.company.create({ data });
	}

	async findByName(name: string): Promise<Company | null> {
		const company = await this.prismaConnection.company.findFirst({
			where: {
				name
			}
		});

		return company ? PrismaCompanyMapper.toDomain(company) : null;
	}

	async findByEmail(email: string): Promise<Company | null> {
		const company = await this.prismaConnection.company.findFirst({
			where: {
				contact: {
					email
				}
			}
		});

		return company ? PrismaCompanyMapper.toDomain(company) : null;
	}
}