import { Hangar } from '@/entities/hangar';
import { PropertyRepository } from '@/repositories/property-repository';

export class InMemoryHangarRepository implements PropertyRepository<Hangar> {
    
	public hangars: Hangar[] = [];
    
	async create(property: Hangar): Promise<void> {
		this.hangars.push(property);
	}
}