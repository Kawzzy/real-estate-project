import { Studio } from '@/entities/studio';
import { PropertyRepository } from '@/repositories/property-repository';

export class InMemoryStudioRepository implements PropertyRepository<Studio> {
    
	public studios: Studio[] = [];

	async create(property: Studio): Promise<void> {
		this.studios.push(property);
	}

	async getAll(): Promise<Studio[] | []> {
		return this.studios;
	}

	async get(propertyId: string): Promise<Studio | null> {
		const studio = this.studios.find(studio => studio.id == propertyId);

		return studio ?? null;
	}

	async delete(propertyId: string): Promise<void> {
		const index = this.studios.findIndex(studio => studio.id === propertyId);

		this.studios.splice(index, 1);
	}
}