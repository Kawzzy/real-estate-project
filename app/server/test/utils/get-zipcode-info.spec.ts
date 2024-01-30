import { describe, expect, it } from 'vitest';
import { getZipCodeInfo } from '@/utils/get-zipcode-info';
import { ZipCodeNotFoundError } from '@/errors/zipcode-not-found-error';

describe('Get ZipCode Info from Via CEP API', () => {
    
	it('should return the zipcode\'s info', async () => {

		const zipCode = '89040-100';
		
		const data = await getZipCodeInfo(zipCode);

		expect(data).toEqual(
			expect.objectContaining({
				cep: zipCode
			})
		);
	});

	it('should return a ZipCodeNotFoundError when the zipCode doesn\'t exist', async () => {	
		await expect(() => 
			getZipCodeInfo('00000000')
		).rejects.toBeInstanceOf(ZipCodeNotFoundError);
	});
});