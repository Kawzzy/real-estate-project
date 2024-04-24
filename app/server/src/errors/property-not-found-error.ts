export class PropertyNotFoundError extends Error {
	constructor(propertyId: string) {
		super(`Property with ID: ${propertyId} not found.`);
	}
}