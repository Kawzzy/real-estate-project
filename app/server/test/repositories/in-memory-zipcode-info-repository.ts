import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { ZipCodeInfoRepository } from '@/repositories/zipcode-info-repository';

export class InMemoryZipCodeInfoRepository implements ZipCodeInfoRepository {

	public zipCodesInfo: ZipCodeInfo[] = [];
    
	async create(zipCodeInfo: ZipCodeInfo): Promise<void> {
		this.zipCodesInfo.push(zipCodeInfo);
	}

	async findByZipCode(zipCode: string): Promise<ZipCodeInfo | null> {
		return this.zipCodesInfo.find(zipCodeInfo => zipCodeInfo.zipCode === zipCode) ?? null;
	}

	async delete(zipCode: string): Promise<void> {
		const zipCodeIndex = this.zipCodesInfo.findIndex(zipCodeInfo => zipCodeInfo.zipCode === zipCode);

		this.zipCodesInfo.splice(zipCodeIndex, 1);
	}
}