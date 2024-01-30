export class ZipCodeAlreadyExistsError extends Error {
	constructor(zipCode: string) {
		super(`CEP "${zipCode}" já existe.`);
	}
}