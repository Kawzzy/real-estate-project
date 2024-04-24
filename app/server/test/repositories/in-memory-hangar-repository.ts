import { Hangar } from '@/entities/hangar';
import { PropertyRepository } from '@/repositories/property-repository';

export class InMemoryHangarRepository implements PropertyRepository<Hangar> {
    
	public hangars: Hangar[] = [];
    
	async create(property: Hangar): Promise<void> {
		this.hangars.push(property);
	}
	
	async getAll(): Promise<Hangar[] | []> {
		return this.hangars;
	}

	async get(propertyId: string): Promise<Hangar | null> {
		const hangar = this.hangars.find(hangar => hangar.id == propertyId);

		return hangar ?? null;
	}

	async delete(propertyId: string): Promise<void> {
		const index = this.hangars.findIndex(hangar => hangar.id === propertyId);

		this.hangars.splice(index, 1);
	}
}