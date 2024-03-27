import { Company } from '@/entities/company';
import { Company as PrismaCompany, Prisma } from '@prisma/client';

export class PrismaCompanyMapper {
	static toPrisma(company: Company): Prisma.CompanyUncheckedCreateInput {
		return {
			id: company.id,
			cod: company.cod,
			name: company.name,
			password: company.password,
			addressId: company.addressId,
			contactId: company.contactId,
			createdAt: company.createdAt
		};
	}

	static toDomain(raw: PrismaCompany): Company {
		return Company.create({
			cod: raw.cod,
			name: raw.name,
			password: raw.password,
			contactId: raw.contactId,
			addressId: raw.addressId,
			createdAt: raw.createdAt,
			agentsIds: [],
			propertiesIds: []
		}, raw.id);
	}
}