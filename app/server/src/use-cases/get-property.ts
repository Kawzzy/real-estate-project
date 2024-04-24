import { Apartment } from '@/entities/apartment';
import { Either, left, right } from '@/utils/either';
import { PropertyRepository } from '@/repositories/property-repository';
import { PropertyNotFoundError } from '@/errors/property-not-found-error';

type GetPropertyResponse = Either<PropertyNotFoundError, { property: unknown }>

export class GetPropertyUseCase {
	constructor(private apartmentRepository: PropertyRepository<Apartment>) {}

	async handle(propertyId: string): Promise<GetPropertyResponse> {
		// it's being used apartmentRepository because all the properties are in the same table and this search is by id
		const property = await this.apartmentRepository.get(propertyId);

		if (!property) {
			return left(new PropertyNotFoundError(propertyId));
		}
		
		return right({
			property
		});
	}
}