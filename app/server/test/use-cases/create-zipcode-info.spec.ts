import { beforeEach, describe, expect, it } from 'vitest';
import { CreateZipCodeInfoUseCase } from '@/use-cases/create-zipcode-info';
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
});