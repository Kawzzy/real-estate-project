import { Apartment } from '@/entities/apartment';
import { PropertyRepository } from '@/repositories/property-repository';

export class InMemoryApartmentRepository implements PropertyRepository<Apartment> {
    
	public apartments: Apartment[] = [];

	async create(property: Apartment): Promise<void> {
		this.apartments.push(property);
	}
}