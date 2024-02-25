import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { Prisma, ZipCodeInfo as PrismaZipCodeInfo } from '@prisma/client';

export class PrismaZipCodeInfoMapper {
	static toPrisma(zipCodeInfo: ZipCodeInfo): Prisma.ZipCodeInfoUncheckedCreateInput {
		return {
			zipCode: zipCodeInfo.zipCode,
			street: zipCodeInfo.street,
			neighborhood: zipCodeInfo.neighborhood,
			city: zipCodeInfo.city,
			state: zipCodeInfo.state,
			createdAt: zipCodeInfo.createdAt
		};
	}

	static toDomain(raw: PrismaZipCodeInfo): ZipCodeInfo {
		return ZipCodeInfo.create({
			zipCode: raw.zipCode,
			street: raw.street,
			neighborhood: raw.neighborhood,
			city: raw.city,
			state: raw.state,
			createdAt: raw.createdAt
		});
	}
}