import { Loft } from '@/entities/loft';
import { PropertyRepository } from '@/repositories/property-repository';

export class InMemoryLoftRepository implements PropertyRepository<Loft> {
    
	public lofts: Loft[] = [];

	async create(property: Loft): Promise<void> {
		this.lofts.push(property);
	}
	
	async getAll(): Promise<Loft[] | []> {
		return this.lofts;
	}

	async get(propertyId: string): Promise<Loft | null> {
		const loft = this.lofts.find(loft => loft.id == propertyId);

		return loft ?? null;
	}

	async delete(propertyId: string): Promise<void> {
		const index = this.lofts.findIndex(loft => loft.id === propertyId);

		this.lofts.splice(index, 1);
	}
}