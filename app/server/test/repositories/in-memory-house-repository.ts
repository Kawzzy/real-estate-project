import { House } from '@/entities/house';
import { PropertyRepository } from '@/repositories/property-repository';

export class InMemoryHouseRepository implements PropertyRepository<House> {
    
	public houses: House[] = [];

	async create(property: House): Promise<void> {
		this.houses.push(property);
	}
}