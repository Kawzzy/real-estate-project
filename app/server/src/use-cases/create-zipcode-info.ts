import { Either, right } from '@/utils/either';
import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { getZipCodeInfo } from '@/utils/get-zipcode-info';
import { ZipCodeInfoRepository } from '@/repositories/zipcode-info-repository';

interface CreateZipCodeInfoUseCaseRequest {
    zipCode: string
}

type CreateZipCodeInfoUseCaseResponse = Either<null, { zipCodeInfo: ZipCodeInfo }>

export class CreateZipCodeInfoUseCase {

	constructor(private zipCodeInfoRepository: ZipCodeInfoRepository) {}

	async handle({ zipCode }: CreateZipCodeInfoUseCaseRequest): Promise<CreateZipCodeInfoUseCaseResponse> {

		let zipCodeInfo = await this.zipCodeInfoRepository.findByZipCode(zipCode);

		if (!zipCodeInfo) {
			const zipCodeData = await getZipCodeInfo(zipCode);
	
			zipCodeInfo = ZipCodeInfo.create({
				zipCode: zipCodeData.cep,
				street: zipCodeData.logradouro,
				neighborhood: zipCodeData.bairro,
				city: zipCodeData.localidade,
				state: zipCodeData.uf
			});
			
			await this.zipCodeInfoRepository.create(zipCodeInfo);
		}
		
		return right({ zipCodeInfo });
	}
}