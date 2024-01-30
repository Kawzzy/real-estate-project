import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { getZipCodeInfo } from '@/utils/get-zipcode-info';
import { ZipCodeInfoRepository } from '@/repositories/zipcode-info-repository';
import { ZipCodeAlreadyExistsError } from '@/errors/zipcode-already-exists-error';

interface CreateZipCodeInfoUseCaseRequest {
    zipCode: string
}

interface CreateZipCodeInfoUseCaseResponse {
    zipCodeInfo: ZipCodeInfo
}

export class CreateZipCodeInfoUseCase {

	constructor(private zipCodeInfoRepository: ZipCodeInfoRepository) {}

	async handle({ zipCode }: CreateZipCodeInfoUseCaseRequest): Promise<CreateZipCodeInfoUseCaseResponse> {

		const existingZipCodeInfo = await this.zipCodeInfoRepository.findByZipCode(zipCode);

		if (existingZipCodeInfo) {
			throw new ZipCodeAlreadyExistsError(zipCode);
		}

		const zipCodeData = await getZipCodeInfo(zipCode);

		const zipCodeInfo = ZipCodeInfo.create({
			zipCode: zipCodeData.cep,
			street: zipCodeData.logradouro,
			neighborhood: zipCodeData.bairro,
			city: zipCodeData.localidade,
			state: zipCodeData.uf
		});
		
		await this.zipCodeInfoRepository.create(zipCodeInfo);
		
		return { zipCodeInfo };
	}

}