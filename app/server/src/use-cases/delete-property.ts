import { Apartment } from '@/entities/apartment';
import { Either, left, right } from '@/utils/either';
import { UnauthorizedException } from '@nestjs/common';
import { PropertyRepository } from '@/repositories/property-repository';
import { PropertyNotFoundError } from '@/errors/property-not-found-error';

type DeletePropertyResponse = Either<PropertyNotFoundError, null>

export class DeletePropertyUseCase {
	constructor(private apartmentRepository: PropertyRepository<Apartment>) {}

	async handle(userId: string, propertyId: string): Promise<DeletePropertyResponse> {
		// it's being used apartmentRepository because all the properties are in the same table and this search is by id
		const property = await this.apartmentRepository.get(propertyId);

		if (!property) {
			return left(new PropertyNotFoundError(propertyId));
		}

		if (userId !== property.ownerId) {
			return left(new UnauthorizedException());
		}

		await this.apartmentRepository.delete(propertyId);

		return right(null);
	}
}