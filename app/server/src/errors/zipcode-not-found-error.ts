export class ZipCodeNotFoundError extends Error {
	constructor(zipCode: string) {
		super(`CEP ${zipCode} não encontrado!`);
	}
}