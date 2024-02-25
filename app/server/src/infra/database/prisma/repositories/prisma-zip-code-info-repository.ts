import { Injectable } from '@nestjs/common';
import { PrismaService } from '../prisma.service';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { ZipCodeInfoRepository } from '@/repositories/zipcode-info-repository';
import { PrismaZipCodeInfoMapper } from '../mappers/prisma-zip-code-info-mapper';

@Injectable()
export class PrismaZipCodeInfoRepository implements ZipCodeInfoRepository {
	constructor(private prismaConnection: PrismaService) {}

	async create(zipCodeInfo: ZipCodeInfo): Promise<void> {
		const data = PrismaZipCodeInfoMapper.toPrisma(zipCodeInfo);
        
		await this.prismaConnection.zipCodeInfo.create({ data });
	}
    
	async findByZipCode(zipCode: string): Promise<ZipCodeInfo | null> {
		const zipCodeFound = await this.prismaConnection.zipCodeInfo.findUnique({
			where: {
				zipCode
			}
		});

		return zipCodeFound ? PrismaZipCodeInfoMapper.toDomain(zipCodeFound) : null;
	}
    
	async delete(zipCode: string): Promise<void> {
		await this.prismaConnection.zipCodeInfo.delete({
			where: {
				zipCode
			}
		});
	}
}