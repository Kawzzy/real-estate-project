import { Apartment } from '@/entities/apartment';
import { PropertyRepository } from '@/repositories/property-repository';

export class InMemoryApartmentRepository implements PropertyRepository<Apartment> {
    
	public apartments: Apartment[] = [];

	async create(property: Apartment): Promise<void> {
		this.apartments.push(property);
	}
	
	async getAll(): Promise<Apartment[] | []> {
		return this.apartments;
	}

	async get(propertyId: string): Promise<Apartment | null> {
		const apartment = this.apartments.find(apartment => apartment.id == propertyId);

		return apartment ?? null;
	}

	async delete(propertyId: string): Promise<void> {
		const index = this.apartments.findIndex(apartment => apartment.id === propertyId);

		this.apartments.splice(index, 1);
	}
}