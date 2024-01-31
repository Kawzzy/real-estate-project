export class CompanyAlreadyExistsError extends Error {
	constructor(name: string) {
		super(`Empresa com o nome "${name}" já cadastrada.`);
	}
}