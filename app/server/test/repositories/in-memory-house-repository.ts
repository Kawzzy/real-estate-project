import { House } from '@/entities/house';
import { PropertyRepository } from '@/repositories/property-repository';

export class InMemoryHouseRepository implements PropertyRepository<House> {
    
	public houses: House[] = [];

	async create(property: House): Promise<void> {
		this.houses.push(property);
	}
	
	async getAll(): Promise<House[] | []> {
		return this.houses;
	}

	async get(propertyId: string): Promise<House | null> {
		const house = this.houses.find(house => house.id == propertyId);

		return house ?? null;
	}

	async delete(propertyId: string): Promise<void> {
		const index = this.houses.findIndex(house => house.id === propertyId);

		this.houses.splice(index, 1);
	}
}