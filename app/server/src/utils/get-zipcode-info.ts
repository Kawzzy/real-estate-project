import fetch from 'node-fetch';

import { ZipCodeNotFoundError } from '@/errors/zipcode-not-found-error';

interface IAddressInfoType {
	cep: string;
	logradouro: string;
	complemento: string;
	bairro: string;
	localidade: string;
	uf: string;
	ibge: string;
	gia: string;
	ddd: string;
	siafi: string;
}

interface IErrorResponseType {
	erro: boolean;
}

type ApiResponseType = IAddressInfoType | IErrorResponseType;

/**
 * Consumes the Via CEP API and returns the zipCode's info.
 * 
 * @param zipCode 
 * @returns ZipCodeNotFoundError | IAddressInfoType
 */
export async function getZipCodeInfo(zipCode: string): Promise<IAddressInfoType> {

	const url = `https://viacep.com.br/ws/${zipCode}/json/`;  

	let data: ApiResponseType;

	try {
		const response = await fetch(url);
		data = await response.json() as ApiResponseType;
	} catch (error) {
		throw new Error(`Error: ${error}`);
	}
	
	if ('erro' in data && data.erro) {
		throw new ZipCodeNotFoundError(zipCode);
	}
	
	return data as IAddressInfoType;
}