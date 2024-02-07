import { Loft } from '@/entities/loft';
import { PropertyRepository } from '@/repositories/property-repository';

export class InMemoryLoftRepository implements PropertyRepository<Loft> {
    
	public lofts: Loft[] = [];

	async create(property: Loft): Promise<void> {
		this.lofts.push(property);
	}
}