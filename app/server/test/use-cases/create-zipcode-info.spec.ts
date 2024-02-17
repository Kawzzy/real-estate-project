import { ZipCodeInfo } from '@/entities/zipCodeInfo';
import { getZipCodeInfo } from '@/utils/get-zipcode-info';
import { beforeEach, describe, expect, it } from 'vitest';
import { CreateZipCodeInfoUseCase } from '@/use-cases/create-zipcode-info';
import { ZipCodeAlreadyExistsError } from '@/errors/zipcode-already-exists-error';
import { InMemoryZipCodeInfoRepository } from 'test/repositories/in-memory-zipcode-info-repository';

let sut: CreateZipCodeInfoUseCase;
let inMemoryZipCodeInfoRepository: InMemoryZipCodeInfoRepository;

describe('Create ZipCodeInfo', () => {

	beforeEach(() => {
		inMemoryZipCodeInfoRepository = new InMemoryZipCodeInfoRepository();
		sut = new CreateZipCodeInfoUseCase(inMemoryZipCodeInfoRepository);
	});
    
	it('should create a ZipCodeInfo', async () => {
		const zipCode = '89040-100';

		const result = await sut.handle({ zipCode });

		expect(result.isRight()).toBe(true);
		expect(result.value).toEqual(
			expect.objectContaining({
				zipCodeInfo: expect.objectContaining({
					id: expect.any(String)
				})
			})
		);
		expect(result.value).toEqual(
			expect.objectContaining({
				zipCodeInfo: expect.objectContaining({
					zipCode
				})
			})
		);
		expect(inMemoryZipCodeInfoRepository.zipCodesInfo).toHaveLength(1);
	});

	it('shouldn\'t create a ZipCodeInfo with the same zipCode', async () => {
		const zipCode = '89040-100';

		const zipCodeData = await getZipCodeInfo(zipCode);

		const zipCodeInfo = ZipCodeInfo.create({
			zipCode: zipCodeData.cep,
			street: zipCodeData.logradouro,
			neighborhood: zipCodeData.bairro,
			city: zipCodeData.localidade,
			state: zipCodeData.uf
		});
        
		inMemoryZipCodeInfoRepository.zipCodesInfo.push(zipCodeInfo);

		const result = await sut.handle({zipCode});
		
		expect(result.value).toBeInstanceOf(ZipCodeAlreadyExistsError);
	});
});