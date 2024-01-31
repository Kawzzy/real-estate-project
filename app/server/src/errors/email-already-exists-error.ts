export class EmailAlreadyExistsError extends Error {
	constructor(email: string) {
		super(`Email "${email}" já cadastrado.`);
	}
}